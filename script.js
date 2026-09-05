/* Rankings, gamemode tables and profiles all come from website-tiers.json. */
(() => {
  'use strict';
  const DATA_URL = './website-tiers.json';
  const MODES = ['crystal', 'uhc', 'pot', 'nethpot', 'smp', 'sword', 'axe', 'mace', 'chaosmace', 'spearmace'];
  const TITLES = [[100, 'Combat Ace'], [50, 'Combat Specialist'], [20, 'Combat Cadet'], [10, 'Combat Novice'], [0, 'Rookie']];
  const titleFor = points => TITLES.find(([minimum]) => points >= minimum)[1];
  const el = (tag, className, text) => {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  };
  const skin = (name, className) => {
    const img = el('img', className);
    img.src = `https://render.crafty.gg/3d/bust/${encodeURIComponent(name)}`;
    img.alt = ''; img.loading = 'lazy';
    return img;
  };
  const search = document.getElementById('playerSearch');
  const popup = document.getElementById('popup');
  const closeButton = document.getElementById('popup-close');
  const panels = document.getElementById('ranking-panels');
  const tabs = Array.from(document.querySelectorAll('.kit-tab'));
  const loadStatus = document.getElementById('load-status');
  const message = document.getElementById('load-message');
  const retry = document.getElementById('retry-load');
  let players = new Map();
  let activeKit = 'overall';
  let loading = false;
  let returnFocus = null;

  // Render one tooltip outside cards so their layout/animations cannot cover its text.
  const tooltip = el('div', 'tier-tooltip');
  tooltip.id = 'tier-tooltip';
  tooltip.setAttribute('role', 'tooltip');
  tooltip.hidden = true;
  document.body.append(tooltip);
  let tooltipTarget = null;
  function hideTooltip() {
    if (tooltipTarget) tooltipTarget.removeAttribute('aria-describedby');
    tooltipTarget = null;
    tooltip.hidden = true;
  }
  function showTooltip(target) {
    hideTooltip();
    tooltipTarget = target;
    target.removeAttribute('title');
    tooltip.textContent = target.dataset.tooltip;
    tooltip.hidden = false;
    const box = target.getBoundingClientRect();
    const size = tooltip.getBoundingClientRect();
    const viewportWidth = document.documentElement.clientWidth || window.innerWidth;
    let top = box.top - size.height - 12;
    if (top < 8) top = box.bottom + 12;
    const left = Math.max(8, Math.min(box.left + box.width / 2 - size.width / 2, viewportWidth - size.width - 8));
    tooltip.style.left = `${left}px`;
    tooltip.style.top = `${top}px`;
    target.setAttribute('aria-describedby', tooltip.id);
  }
  document.addEventListener('pointerover', event => {
    const target = event.target.closest?.('.kit-item[data-tooltip]');
    if (target && target !== tooltipTarget) showTooltip(target);
  });
  document.addEventListener('pointerout', event => {
    if (tooltipTarget && tooltipTarget.contains(event.target) && !tooltipTarget.contains(event.relatedTarget)) hideTooltip();
  });
  document.addEventListener('focusin', event => {
    const target = event.target.closest?.('.kit-item[data-tooltip]');
    if (target) showTooltip(target);
  });
  document.addEventListener('focusout', event => {
    if (tooltipTarget?.contains(event.target)) hideTooltip();
  });
  document.addEventListener('scroll', hideTooltip, true);
  window.addEventListener('resize', hideTooltip);

  function badgeList(player) {
    return Object.entries(player.tiers).sort((a,b) => b[1].points - a[1].points || MODES.indexOf(a[0]) - MODES.indexOf(b[0]))
      .map(([mode, result]) => ItsTiers.createBadge(mode, result));
  }
  function clickable(node, player) {
    node.dataset.player = player.minecraft;
    node.tabIndex = 0;
    node.setAttribute('role', 'button');
    node.setAttribute('aria-label', `View ${player.minecraft}'s profile`);
    return node;
  }
  function overallCard(player) {
    const places = ['first-place', 'second-place', 'third-place'];
    const card = clickable(el('div', `overall-player ${places[player.rank - 1] || ''}`), player);
    card.append(el('div', 'player-bg'), el('i', player.rank <= 3 ? `rank${player.rank}` : 'rank', `${player.rank}.`));
    const wrapper = el('div', 'skin-wrapper'); wrapper.append(skin(player.minecraft, 'player-skin'));
    const info = el('div', 'player-info');
    info.append(el('div', 'name', player.minecraft), el('div', 'points', `${titleFor(player.totalPoints)} (${player.totalPoints} points)`));
    const right = el('div', 'player-right');
    const region = el('div', `region ${player.region.toLowerCase()}`, player.region);
    const icons = el('div', 'kit-icons'); icons.append(...badgeList(player));
    right.append(region, icons); card.append(wrapper, info, right);
    return card;
  }
  function modeRow(player, mode) {
    const result = player.tiers[mode];
    const kind = result.tier.startsWith('H') ? 'ht' : 'lt';
    const region = result.region || player.region;
    const row = clickable(el('div', `player ${kind} ${region.toLowerCase()}`), player);
    const identity = el('span', 'table-player-name');
    identity.append(skin(player.minecraft, 'player-skintable'), document.createTextNode(` ${player.minecraft}`));
    row.append(identity, el('span', `player-tier ${kind}`, kind === 'ht' ? '⇈' : '⇡'));
    row.title = `${result.tooltip}\n${region}`;
    return row;
  }
  function validatePlayers(ranking) {
    const names = new Set();
    for (const player of ranking) {
      if (!/^[A-Za-z0-9_]{1,16}$/.test(player.minecraft) || !['EU','NA','AS','SA','AU'].includes(player.region)) throw new Error('Invalid player identity');
      const key = player.minecraft.toLowerCase();
      if (names.has(key)) throw new Error('Duplicate player');
      names.add(key);
      for (const result of Object.values(player.tiers)) {
        if (result.region && !['EU','NA','AS','SA','AU'].includes(result.region)) throw new Error('Invalid gamemode region');
      }
    }
  }
  function render(ranking) {
    validatePlayers(ranking);
    const overall = document.createDocumentFragment();
    overall.append(...ranking.map(overallCard));
    const tables = MODES.map(mode => {
      const table = el('div', 'tier-table');
      const columns = Array.from({length:5}, (_, i) => {
        const column = el('div', `tier tier${i + 1}`);
        column.append(el('h3', '', `Tier ${i + 1}`)); return column;
      });
      // Retired players remain in Overall/profiles and keep peak points, as on the original site.
      const entries = ranking.filter(p => p.tiers[mode] && !p.tiers[mode].retired && /^[HL]T[1-5]$/.test(p.tiers[mode].tier));
      entries.sort((a,b) => a.tiers[mode].tier[0].localeCompare(b.tiers[mode].tier[0]) || a.minecraft.localeCompare(b.minecraft, 'en'));
      for (const player of entries) columns[Number(player.tiers[mode].tier[2]) - 1].append(modeRow(player, mode));
      table.append(...columns); return table;
    });
    // Swap the page only after the full dataset and its UI have been built successfully.
    document.getElementById('overall').replaceChildren(overall);
    tables.forEach((table, i) => document.getElementById(`kit${i + 1}`).replaceChildren(table));
    players = new Map(ranking.map(player => [player.minecraft.toLowerCase(), player]));
    applySearch();
  }
  function applySearch() {
    const query = search.value.trim().toLowerCase();
    for (const card of panels.querySelectorAll('[data-player]')) card.hidden = !card.dataset.player.toLowerCase().includes(query);
    const panel = document.getElementById(activeKit);
    const found = Array.from(panel.querySelectorAll('[data-player]')).some(node => !node.hidden);
    const status = document.getElementById('search-status');
    status.hidden = found || loading;
    status.textContent = query ? 'No players found.' : (activeKit === 'overall' ? 'No ranked players yet.' : 'No active tiers in this gamemode yet.');
  }
  function showKit(tab) {
    hideTooltip();
    const next = tab.dataset.kit;
    const oldIndex = tabs.findIndex(item => item.dataset.kit === activeKit);
    const nextIndex = tabs.indexOf(tab);
    for (const item of tabs) {
      const selected = item === tab;
      item.classList.toggle('active', selected);
      item.setAttribute('aria-selected', String(selected));
      const panel = document.getElementById(item.dataset.kit);
      panel.hidden = !selected;
      panel.classList.remove('active', 'slide-left', 'slide-right');
      if (selected) panel.classList.add('active', nextIndex > oldIndex ? 'slide-right' : 'slide-left');
    }
    activeKit = next;
    if (!loading) applySearch();
  }
  function openProfile(name) {
    hideTooltip();
    const player = players.get(name.toLowerCase());
    if (!player) return;
    returnFocus = document.activeElement;
    document.getElementById('popup-name').textContent = player.minecraft;
    const portrait = document.getElementById('popup-skin');
    portrait.src = `https://render.crafty.gg/3d/bust/${encodeURIComponent(player.minecraft)}`;
    portrait.alt = `${player.minecraft}'s Minecraft skin`;
    document.getElementById('popup-title').textContent = titleFor(player.totalPoints);
    const rank = document.getElementById('popup-rank');
    rank.textContent = `${player.rank}.`;
    rank.className = `popup-rank ${['gold', 'silver', 'bronze'][player.rank - 1] || ''}`;
    document.getElementById('popup-points').textContent = `${player.totalPoints} points`;
    document.getElementById('popup-tiers').replaceChildren(...badgeList(player));
    popup.hidden = false;
    document.body.classList.add('profile-open');
    closeButton.focus();
  }
  function closeProfile() {
    hideTooltip();
    popup.hidden = true;
    document.body.classList.remove('profile-open');
    if (returnFocus?.isConnected) returnFocus.focus();
  }
  async function loadRankings() {
    if (loading) return;
    loading = true; retry.hidden = true; search.disabled = true;
    loadStatus.hidden = false; message.textContent = 'Loading rankings…';
    document.getElementById('search-status').hidden = true;
    panels.setAttribute('aria-busy', 'true');
    try {
      const ranking = await ItsTiers.load(DATA_URL);
      render(ranking); loadStatus.hidden = true; search.disabled = false;
    } catch (error) {
      console.error('Could not load rankings:', error);
      message.textContent = 'Rankings could not be loaded. Please try again.';
      retry.hidden = false;
    } finally {
      loading = false; panels.setAttribute('aria-busy', 'false');
      if (loadStatus.hidden) applySearch();
    }
  }
  tabs.forEach(tab => {
    tab.addEventListener('click', () => showKit(tab));
    tab.addEventListener('keydown', event => {
      if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); showKit(tab); return; }
      if (!['ArrowLeft','ArrowRight','Home','End'].includes(event.key)) return;
      event.preventDefault();
      const i = tabs.indexOf(tab);
      const next = event.key === 'Home' ? 0 : event.key === 'End' ? tabs.length - 1 : (i + (event.key === 'ArrowRight' ? 1 : -1) + tabs.length) % tabs.length;
      tabs[next].focus(); showKit(tabs[next]);
    });
  });
  panels.addEventListener('click', event => {
    const row = event.target.closest('[data-player]'); if (row) openProfile(row.dataset.player);
  });
  panels.addEventListener('keydown', event => {
    if (event.key !== 'Enter' && event.key !== ' ') return;
    const row = event.target.closest('[data-player]');
    if (row) { event.preventDefault(); openProfile(row.dataset.player); }
  });
  search.addEventListener('input', applySearch);
  search.addEventListener('keydown', event => {
    if (event.key !== 'Enter') return;
    const query = search.value.trim().toLowerCase(); if (!query) return;
    const player = players.get(query) || Array.from(players.values()).find(p => p.minecraft.toLowerCase().includes(query));
    if (player) openProfile(player.minecraft);
  });
  closeButton.addEventListener('click', closeProfile);
  popup.addEventListener('click', event => { if (event.target === popup) closeProfile(); });
  document.addEventListener('keydown', event => {
    if (popup.hidden) return;
    if (event.key === 'Escape') { event.preventDefault(); closeProfile(); }
    if (event.key === 'Tab') {
      const focusable = Array.from(popup.querySelectorAll('button, [tabindex="0"]'));
      const first = focusable[0], last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    }
  });
  retry.addEventListener('click', loadRankings);
  loadRankings();
})();
