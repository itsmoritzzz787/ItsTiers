/* Rankings, gamemode tables and profiles all come from website-tiers.json. */
(() => {
  'use strict';
  const DATA_URL = './website-tiers.json';
  const MODES = ['crystal', 'uhc', 'pot', 'nethpot', 'smp', 'sword', 'axe', 'mace', 'chaosmace', 'spearmace'];
  const TITLES = [
    { minimum: 400, id: 'grandmaster', name: 'Combat Grandmaster', description: 'Obtained 400+ total points.' },
    { minimum: 250, id: 'master', name: 'Combat Master', description: 'Obtained 250+ total points.' },
    { minimum: 100, id: 'ace', name: 'Combat Ace', description: 'Obtained 100+ total points.' },
    { minimum: 50, id: 'specialist', name: 'Combat Specialist', description: 'Obtained 50+ total points.' },
    { minimum: 20, id: 'cadet', name: 'Combat Cadet', description: 'Obtained 20+ total points.' },
    { minimum: 10, id: 'novice', name: 'Combat Novice', description: 'Obtained 10+ total points.' },
    { minimum: 0, id: 'rookie', name: 'Rookie', description: 'Starting rank for players with less than 10 points.' }
  ];
  const rankFor = points => TITLES.find(rank => points >= rank.minimum);
  const el = (tag, className, text) => {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  };
  const skin = (name, className, options = {}) => {
    const img = el('img', className);
    const identifier = options.uuid || name;
    img.src = `https://render.crafty.gg/3d/bust/${encodeURIComponent(identifier)}`;
    img.alt = options.label ? `${name}'s Skin` : '';
    img.loading = options.eager ? 'eager' : 'lazy';
    return img;
  };
  const rankIcon = rank => {
    const image = el('img', `rank-icon rank-icon-${rank.id}`);
    image.src = `assets/rank-icons/${rank.id}.svg`;
    image.alt = '';
    return image;
  };
  const search = document.getElementById('playerSearch');
  const popup = document.getElementById('popup');
  const ltmPopup = document.getElementById('ltm-player-popup');
  const closeButton = document.getElementById('popup-close');
  const ltmCloseButton = document.getElementById('ltm-player-close');
  const panels = document.getElementById('ranking-panels');
  const tabs = Array.from(document.querySelectorAll('.kit-tab'));
  const loadStatus = document.getElementById('load-status');
  const message = document.getElementById('load-message');
  const retry = document.getElementById('retry-load');
  const searchError = document.getElementById('search-error');
  const particleLayer = document.getElementById('ambient-particles');
  const pageProgress = document.getElementById('page-progress');
  let players = new Map();
  let ltmData = {definitions:[],active:null,players:[]};
  let activeKit = 'overall';
  let loading = false;
  let returnFocus = null;
  let progressTimer = 0;
  let panelTimer = 0;
  let rankedPlayers = [];
  let renderedPlayers = 0;
  let rankingSentinel = null;
  const RANKING_BATCH_SIZE = 5;
  const rankingObserver = 'IntersectionObserver' in window
    ? new IntersectionObserver(entries => {
        if (entries.some(entry => entry.isIntersecting)) renderMorePlayers();
      }, { rootMargin: '0px 0px -10%' })
    : null;

  // Decorative particles fill the quiet space around the centred ranking.
  // Fixed values keep the layout stable between reloads and avoid a canvas loop.
  if (particleLayer) {
    const particles = Array.from({length: 34}, (_, index) => {
      const particle = el('i', 'ambient-particle');
      const seed = index + 1;
      particle.style.setProperty('--particle-x', `${(seed * 37) % 101}%`);
      particle.style.setProperty('--particle-size', `${2 + (seed * 7) % 5}px`);
      particle.style.setProperty('--particle-duration', `${18 + (seed * 11) % 19}s`);
      particle.style.setProperty('--particle-delay', `${-((seed * 13) % 31)}s`);
      particle.style.setProperty('--particle-drift', `${-55 + (seed * 29) % 111}px`);
      return particle;
    });
    particleLayer.append(...particles);
  }

  function runProgress(indeterminate = false) {
    clearTimeout(progressTimer);
    pageProgress.classList.remove('is-running', 'is-loading');
    void pageProgress.offsetWidth;
    pageProgress.classList.add(indeterminate ? 'is-loading' : 'is-running');
    if (!indeterminate) progressTimer = window.setTimeout(() => pageProgress.classList.remove('is-running'), 720);
  }
  function finishProgress() {
    clearTimeout(progressTimer);
    pageProgress.classList.remove('is-loading');
    pageProgress.classList.add('is-finishing');
    progressTimer = window.setTimeout(() => pageProgress.classList.remove('is-finishing'), 280);
  }
  function animatePanel(panel) {
    clearTimeout(panelTimer);
    const entries = panel.querySelectorAll('.overall-player, .tier, .ltm-choice, .ltm-table-heading');
    entries.forEach((entry, index) => entry.style.setProperty('--entry-delay', `${Math.min(index * 24, 240)}ms`));
    panel.classList.remove('panel-entering');
    void panel.offsetWidth;
    panel.classList.add('panel-entering');
    panelTimer = window.setTimeout(() => panel.classList.remove('panel-entering'), 760);
  }

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
    tooltip.classList.remove('is-visible');
    tooltip.hidden = true;
  }
  function showTooltip(target) {
    hideTooltip();
    tooltipTarget = target;
    target.removeAttribute('title');
    const [tierText, pointsText = ''] = target.dataset.tooltip.split('\n');
    tooltip.replaceChildren(
      el('strong', 'tier-tooltip-tier', tierText),
      el('span', 'tier-tooltip-points', pointsText)
    );
    tooltip.hidden = false;
    void tooltip.offsetWidth;
    tooltip.classList.add('is-visible');
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
    const order = ['HT1','LT1','HT2','LT2','HT3','LT3','HT4','LT4','HT5','LT5'];
    const rank = tier => order.includes(tier) ? order.indexOf(tier) : 99;
    return Object.entries(player.tiers).sort((a,b) => Number(Boolean(a[1].retired)) - Number(Boolean(b[1].retired)) || rank(a[1].tier) - rank(b[1].tier) || MODES.indexOf(a[0]) - MODES.indexOf(b[0]))
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
    const position = el('div', 'player-position');
    position.append(el('i', player.rank <= 3 ? `rank${player.rank}` : 'rank', `${player.rank}.`));
    const wrapper = el('div', 'skin-wrapper');
    wrapper.append(skin(player.minecraft, 'player-skin', {
      uuid: player.minecraftUuid || player.uuid,
      eager: true,
      label: true
    }));
    position.append(wrapper);
    const info = el('div', 'player-info');
    const rank = rankFor(player.totalPoints);
    const details = el('div', `points rank-text rank-${rank.id}`);
    details.append(rankIcon(rank), document.createTextNode(`${rank.name} (${player.totalPoints} points)`));
    info.append(el('div', 'name', player.minecraft), details);
    const right = el('div', 'player-right');
    const region = el('div', `region ${player.region.toLowerCase()}`, player.region);
    const icons = el('div', 'kit-icons'); icons.append(...badgeList(player));
    const ltmCount=Object.keys(player.ltms || {}).length;
    if (ltmCount) icons.append(ItsTiers.createLtmButton(ltmCount));
    right.append(icons, region); card.append(el('div', 'player-bg'), position, info, right);
    return card;
  }
  function renderMorePlayers() {
    if (!rankingSentinel || renderedPlayers >= rankedPlayers.length) return;
    const overall = document.getElementById('overall');
    const end = Math.min(renderedPlayers + RANKING_BATCH_SIZE, rankedPlayers.length);
    const fragment = document.createDocumentFragment();
    for (let index = renderedPlayers; index < end; index += 1) {
      const card = overallCard(rankedPlayers[index]);
      card.style.setProperty('--entry-delay', `${Math.min((index - renderedPlayers) * 48, 240)}ms`);
      card.classList.add('lazy-ranking-entry');
      fragment.append(card);
    }
    overall.insertBefore(fragment, rankingSentinel);
    renderedPlayers = end;
    rankingSentinel.setAttribute('aria-label', `${renderedPlayers} of ${rankedPlayers.length} players loaded`);
    if (renderedPlayers >= rankedPlayers.length) {
      rankingObserver?.unobserve(rankingSentinel);
      rankingSentinel.remove();
      rankingSentinel = null;
    }
  }
  function resetOverall(ranking) {
    rankingObserver?.disconnect();
    rankedPlayers = ranking;
    renderedPlayers = 0;
    rankingSentinel = el('div', 'ranking-sentinel');
    rankingSentinel.setAttribute('role', 'status');
    rankingSentinel.setAttribute('aria-live', 'polite');
    rankingSentinel.append(el('i', ''), el('i', ''), el('i', ''));
    const tableHeader = el('div', 'ranking-table-header');
    tableHeader.append(
      el('span', 'ranking-heading-number', '#'),
      el('span', 'ranking-heading-player', 'PLAYER'),
      el('span', 'ranking-heading-region', 'REGION'),
      el('span', 'ranking-heading-tiers', 'TIERS')
    );
    document.getElementById('overall').replaceChildren(tableHeader, rankingSentinel);
    renderMorePlayers();
    if (rankingSentinel) {
      if (rankingObserver) rankingObserver.observe(rankingSentinel);
      else {
        const button = el('button', 'load-more-players', 'Load more players');
        button.type = 'button';
        button.addEventListener('click', renderMorePlayers);
        rankingSentinel.replaceChildren(button);
      }
    }
  }
  function modeRow(player, mode, suppliedResult) {
    const result = suppliedResult || player.tiers[mode];
    const kind = result.tier.startsWith('H') ? 'ht' : 'lt';
    const region = result.region || player.region;
    const row = clickable(el('div', `player ${kind} ${region.toLowerCase()}`), player);
    const identity = el('span', 'table-player-name');
    identity.append(skin(player.minecraft, 'player-skintable'), document.createTextNode(` ${player.minecraft}`));
    row.append(identity, el('span', `player-tier ${kind}`, kind === 'ht' ? '⇈' : '⇡'));
    row.title = `${result.tooltip}\n${region}`;
    return row;
  }
  function tierColumns() {
    return Array.from({length: 5}, (_, index) => {
      const tierNumber = index + 1;
      const column = el('div', `tier tier${tierNumber}`);
      const heading = el('h3', 'tier-heading');
      if (tierNumber <= 3) {
        const trophy = el('img', `tier-cup tier-cup${tierNumber}`);
        trophy.src = 'assets/overall.svg';
        trophy.alt = `Tier ${tierNumber} trophy`;
        heading.append(trophy);
      }
      heading.append(document.createTextNode(`Tier ${tierNumber}`));
      column.append(heading);
      return column;
    });
  }
  function ltmTable(ranking,id) {
    const table=el('div','tier-table');
    const columns=tierColumns();
    const entries=ranking.filter(player=>/^[HL]T[1-5]$/.test(player.ltms?.[id]?.tier || ''))
      .sort((a,b)=>a.ltms[id].tier[0].localeCompare(b.ltms[id].tier[0]) || a.minecraft.localeCompare(b.minecraft,'en'));
    for (const player of entries) columns[Number(player.ltms[id].tier[2])-1].append(modeRow(player,id,player.ltms[id]));
    table.append(...columns);return table;
  }
  function renderLtmPanel(ranking) {
    const panel=el('div','ltm-panel');
    if (!ltmData.definitions.length) { panel.append(el('p','ltm-empty','No limited-time modes have been added yet.')); return panel; }
    const picker=el('div','ltm-picker');picker.setAttribute('aria-label','Limited-time modes');
    const heading=el('div','ltm-table-heading');
    const tableHost=el('div','ltm-table-host');
    const definitions=[...ltmData.definitions].sort((a,b)=>Number(b.id===ltmData.active?.id)-Number(a.id===ltmData.active?.id)||a.name.localeCompare(b.name,'en'));
    function select(definition,button) {
      for (const item of picker.querySelectorAll('.ltm-choice')) item.classList.toggle('active',item===button);
      heading.replaceChildren();
      const image=el('img','');image.src=definition.icon;image.alt='';
      const title=el('h2','',definition.name);heading.append(image,title);
      if (definition.id===ltmData.active?.id) heading.append(el('span','ltm-active-label','ACTIVE'));
      tableHost.replaceChildren(ltmTable(ranking,definition.id));applySearch();
    }
    definitions.forEach((definition,index)=>{
      const button=el('button','ltm-choice');button.type='button';
      const image=el('img','');image.src=definition.icon;image.alt='';
      button.append(image,el('span','',definition.name));
      if(definition.id===ltmData.active?.id)button.append(el('small','','ACTIVE'));
      button.addEventListener('click',()=>select(definition,button));picker.append(button);
      if(index===0) queueMicrotask(()=>select(definition,button));
    });
    panel.append(picker,heading,tableHost);return panel;
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
  function render(ranking, loadedLtm) {
    ltmData=loadedLtm;
    validatePlayers(ranking);
    const tables = MODES.map(mode => {
      const table = el('div', 'tier-table');
      const columns = tierColumns();
      // Retired players remain in Overall/profiles and keep peak points, as on the original site.
      const entries = ranking.filter(p => p.tiers[mode] && !p.tiers[mode].retired && /^[HL]T[1-5]$/.test(p.tiers[mode].tier));
      entries.sort((a,b) => a.tiers[mode].tier[0].localeCompare(b.tiers[mode].tier[0]) || a.minecraft.localeCompare(b.minecraft, 'en'));
      for (const player of entries) columns[Number(player.tiers[mode].tier[2]) - 1].append(modeRow(player, mode));
      table.append(...columns); return table;
    });
    // Swap the page only after the full dataset and its UI have been built successfully.
    resetOverall(ranking);
    tables.forEach((table, i) => document.getElementById(`kit${i + 1}`).replaceChildren(table));
    document.getElementById('ltm').replaceChildren(renderLtmPanel(ranking));
    players = new Map(ranking.map(player => [player.minecraft.toLowerCase(), player]));
    applySearch();
  }
  function applySearch() {
    const panel = document.getElementById(activeKit);
    const found = Array.from(panel.querySelectorAll('[data-player]')).some(node => !node.hidden);
    const status = document.getElementById('search-status');
    status.hidden = found || loading;
    status.textContent = activeKit === 'overall' ? 'No ranked players yet.' : 'No active tiers in this gamemode yet.';
  }
  function clearSearchError() {
    searchError.hidden = true;
    search.removeAttribute('aria-invalid');
  }
  function showSearchError() {
    searchError.hidden = false;
    search.setAttribute('aria-invalid', 'true');
    searchError.classList.remove('is-visible');
    void searchError.offsetWidth;
    searchError.classList.add('is-visible');
  }
  function showKit(tab) {
    hideTooltip();
    const next = tab.dataset.kit;
    if (next === activeKit) return;
    runProgress();
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
    animatePanel(document.getElementById(next));
    if (!loading) applySearch();
  }
  function openProfile(name, { focusClose = true } = {}) {
    hideTooltip();
    const player = players.get(name.toLowerCase());
    if (!player) return;
    returnFocus = document.activeElement;
    document.getElementById('popup-name').textContent = player.minecraft;
    const portrait = document.getElementById('popup-skin');
    portrait.src = `https://render.crafty.gg/3d/bust/${encodeURIComponent(player.minecraft)}`;
    portrait.alt = `${player.minecraft}'s Minecraft skin`;
    const rankTitle = rankFor(player.totalPoints);
    const popupTitle = document.getElementById('popup-title');
    popupTitle.className = `popup-title rank-${rankTitle.id}`;
    popupTitle.replaceChildren(rankIcon(rankTitle), document.createTextNode(rankTitle.name));
    document.getElementById('popup-region').textContent = ({EU:'Europe', NA:'North America', AS:'Asia', SA:'South America', AU:'Australia'})[player.region] || player.region;
    document.getElementById('popup-namemc').href = `https://namemc.com/profile/${encodeURIComponent(player.minecraft)}`;
    const rank = document.getElementById('popup-rank');
    rank.textContent = `${player.rank}.`;
    rank.className = `popup-rank ${['gold', 'silver', 'bronze'][player.rank - 1] || ''}`;
    document.getElementById('popup-points').textContent = `${player.totalPoints} points`;
    document.getElementById('popup-tiers').replaceChildren(...badgeList(player));
    popup.hidden = false;
    document.body.classList.add('profile-open');
    if (focusClose) closeButton.focus();
    else {
      popup.tabIndex = -1;
      popup.focus();
    }
  }
  function openLtmResults(name) {
    hideTooltip();
    const player=players.get(name.toLowerCase());if(!player)return;
    const definitions=new Map(ltmData.definitions.map(item=>[item.id,item]));
    const results=Object.entries(player.ltms || {}).filter(([id])=>definitions.has(id));
    if(!results.length)return;
    returnFocus=document.activeElement;
    document.getElementById('ltm-player-title').textContent=player.minecraft;
    const rows=results.sort((a,b)=>definitions.get(a[0]).name.localeCompare(definitions.get(b[0]).name,'en')).map(([id,result])=>{
      const definition=definitions.get(id);const row=el('div','ltm-result-row');
      const image=el('img','ltm-result-icon');image.src=definition.icon;image.alt='';
      const info=el('div','ltm-result-info');info.append(el('strong','',definition.name),el('span','',`${result.points} points${id===ltmData.active?.id?' · Active':''}`));
      const tier=el('span',`ltm-result-tier ${result.tier.toLowerCase()}`,result.tier);
      if(result.peakTier && result.peakTier!==result.tier)tier.title=`Peak ${result.peakTier}`;
      row.append(image,info,tier);return row;
    });
    document.getElementById('ltm-player-results').replaceChildren(...rows);
    ltmPopup.hidden=false;document.body.classList.add('profile-open');ltmCloseButton.focus();
  }
  function closeProfile() {
    hideTooltip();
    popup.hidden = true;
    document.body.classList.remove('profile-open');
    if (returnFocus?.isConnected) returnFocus.focus();
  }
  function closeLtmResults() {
    ltmPopup.hidden=true;document.body.classList.remove('profile-open');
    if(returnFocus?.isConnected)returnFocus.focus();
  }
  async function loadRankings() {
    if (loading) return;
    loading = true; retry.hidden = true; search.disabled = true;
    runProgress(true);
    loadStatus.hidden = false; message.textContent = 'Loading rankings…';
    document.getElementById('search-status').hidden = true;
    panels.setAttribute('aria-busy', 'true');
    try {
      const data = await ItsTiers.loadData(DATA_URL);
      render(data.ranking,data.ltm); loadStatus.hidden = true; search.disabled = false;
      animatePanel(document.getElementById(activeKit));
    } catch (error) {
      console.error('Could not load rankings:', error);
      message.textContent = 'Rankings could not be loaded. Please try again.';
      retry.hidden = false;
    } finally {
      loading = false; panels.setAttribute('aria-busy', 'false');
      finishProgress();
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
    const ltmButton=event.target.closest('.ltm-player-trigger');
    if(ltmButton){event.stopPropagation();const card=ltmButton.closest('[data-player]');if(card)openLtmResults(card.dataset.player);return;}
    const row = event.target.closest('[data-player]'); if (row) openProfile(row.dataset.player);
  });
  panels.addEventListener('keydown', event => {
    if (event.key !== 'Enter' && event.key !== ' ') return;
    const ltmButton=event.target.closest('.ltm-player-trigger');
    if(ltmButton){event.preventDefault();const card=ltmButton.closest('[data-player]');if(card)openLtmResults(card.dataset.player);return;}
    const row = event.target.closest('[data-player]');
    if (row) { event.preventDefault(); openProfile(row.dataset.player); }
  });
  search.addEventListener('input', clearSearchError);
  search.addEventListener('keydown', event => {
    if (event.key !== 'Enter') return;
    event.preventDefault();
    const query = search.value.trim().toLowerCase(); if (!query) return;
    const player = players.get(query);
    // The search result keeps focus on the dialog rather than the close button.
    // That avoids Chromium reusing the same Enter key press to close the profile.
    if (player) { clearSearchError(); openProfile(player.minecraft, { focusClose: false }); }
    else showSearchError();
  });
  closeButton.addEventListener('click', closeProfile);
  ltmCloseButton.addEventListener('click', closeLtmResults);
  popup.addEventListener('click', event => { if (event.target === popup) closeProfile(); });
  ltmPopup.addEventListener('click', event => { if (event.target === ltmPopup) closeLtmResults(); });
  document.addEventListener('keydown', event => {
    if (popup.hidden && ltmPopup.hidden) return;
    if (event.key === 'Escape') { event.preventDefault(); popup.hidden ? closeLtmResults() : closeProfile(); }
    if (event.key === 'Tab') {
      const dialog=popup.hidden?ltmPopup:popup;
      const focusable = Array.from(dialog.querySelectorAll('button, a[href], [tabindex="0"]'));
      const first = focusable[0], last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    }
  });
  retry.addEventListener('click', loadRankings);
  loadRankings();
})();
