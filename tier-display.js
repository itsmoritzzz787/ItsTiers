/* ItsTiers display helpers. Keep derived points and tooltip text out of JSON. */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else root.ItsTiers = factory();
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';

  const POINTS_BY_TIER = Object.freeze({
    HT1: 60, LT1: 45, HT2: 30, LT2: 20, HT3: 10,
    LT3: 6, HT4: 4, LT4: 3, HT5: 2, LT5: 1
  });
  const TIER_ORDER = ['HT1','LT1','HT2','LT2','HT3','LT3','HT4','LT4','HT5','LT5'];
  const MODE_ICONS = Object.freeze({
    crystal: 'https://mctiers.com/tier_icons/vanilla.svg',
    uhc: 'https://mctiers.com/tier_icons/uhc.svg',
    pot: 'https://mctiers.com/tier_icons/pot.svg',
    nethpot: 'https://mctiers.com/tier_icons/nethop.svg',
    smp: 'https://mctiers.com/tier_icons/smp.svg',
    sword: 'https://mctiers.com/tier_icons/sword.svg',
    axe: 'https://mctiers.com/tier_icons/axe.svg',
    mace: 'https://mctiers.com/tier_icons/mace.svg',
    chaosmace: 'https://subtiers.net/assets/trident-1c1a3e5a.svg',
    spearmace: 'https://cdn-icons-png.magnific.com/512/6428/6428889.png'
  });
  const MODE_LABELS = Object.freeze({
    crystal: 'Crystal', uhc: 'UHC', pot: 'Pot', nethpot: 'NethPot',
    smp: 'SMP', sword: 'Sword', axe: 'Axe', mace: 'Mace',
    chaosmace: 'ChaosMace', spearmace: 'Spear Mace'
  });
  const own = (object, key) => Object.prototype.hasOwnProperty.call(object, key);
  const isRecord = value => value !== null && typeof value === 'object' && !Array.isArray(value);
  const isTier = value => typeof value === 'string' && own(POINTS_BY_TIER, value);

  function tierInfo(result) {
    if (!isRecord(result)) throw new TypeError('Tier result must be an object');
    const tier = result.tier;
    if (!isTier(tier) && tier !== 'Unranked' && tier !== 'Retest') {
      throw new TypeError('Unknown tier: ' + String(tier));
    }
    if (result.peakTier != null && !isTier(result.peakTier)) {
      throw new TypeError('Unknown peak tier: ' + String(result.peakTier));
    }
    if (result.retired !== undefined && typeof result.retired !== 'boolean') {
      throw new TypeError('Retired status must be a boolean');
    }

    const currentPoints = isTier(tier) ? POINTS_BY_TIER[tier] : 0;
    const reportedPeak = result.peakTier || null;
    const peakTier = [tier, reportedPeak].filter(isTier)
      .sort((a, b) => TIER_ORDER.indexOf(a) - TIER_ORDER.indexOf(b))[0] || null;
    const points = peakTier ? POINTS_BY_TIER[peakTier] : 0;
    const retired = result.retired === true;
    const hasBetterPeak = peakTier !== null && peakTier !== tier;
    const summary = retired
      ? 'Retired ' + tier + (hasBetterPeak ? ' · Peak ' + peakTier : '')
      : (hasBetterPeak ? 'Peak ' + peakTier : tier);

    return { tier, peakTier, retired, currentPoints, peakPoints: points, points, tooltip: summary + '\n' + points + ' Points' };
  }

  function normalizeLtm(ltm) {
    if (ltm === undefined) return {definitions:[],active:null,players:[]};
    if (!isRecord(ltm) || !Array.isArray(ltm.definitions) || !Array.isArray(ltm.players)) throw new TypeError('Invalid LTM data');
    const ids = new Set();
    const definitions = ltm.definitions.map(definition => {
      if (!isRecord(definition) || !/^[a-z0-9](?:[a-z0-9-]{0,31})$/.test(definition.id || '') ||
          typeof definition.name !== 'string' || !definition.name.trim() || !/^https:\/\//.test(definition.icon || '') || ids.has(definition.id)) {
        throw new TypeError('Invalid LTM definition');
      }
      ids.add(definition.id); return {...definition};
    });
    const players = ltm.players.map(player => {
      if (!isRecord(player) || typeof player.minecraft !== 'string' || !isRecord(player.results)) throw new TypeError('Invalid LTM player');
      const results = Object.fromEntries(Object.entries(player.results).map(([id,result]) => {
        if (!ids.has(id)) throw new TypeError('Unknown LTM result');
        return [id,{...result,...tierInfo(result)}];
      }));
      return {...player,results};
    });
    const active = ltm.active && ids.has(ltm.active.id) ? {...ltm.active} : null;
    return {definitions,active,players};
  }

  function rankPlayers(players, ltmData = {players:[]}) {
    if (!Array.isArray(players)) throw new TypeError('Players must be an array');
    const ltmByName = new Map((ltmData.players || []).map(player => [player.minecraft.toLowerCase(),player]));
    const standardNames = new Set(players.map(player => String(player.minecraft).toLowerCase()));
    const combined = [...players, ...(ltmData.players || []).filter(player => !standardNames.has(player.minecraft.toLowerCase())).map(player => ({minecraft:player.minecraft,region:player.region,tiers:{}}))];
    const ranked = combined.map(player => {
      if (!isRecord(player) || typeof player.minecraft !== 'string' || !player.minecraft.trim() || !isRecord(player.tiers)) {
        throw new TypeError('Each player needs a Minecraft name and a tiers object');
      }
      let totalPoints = 0;
      const tiers = Object.fromEntries(Object.entries(player.tiers).map(([mode, result]) => {
        if (!own(MODE_ICONS, mode)) throw new TypeError('Unknown mode: ' + mode);
        const info = tierInfo(result);
        totalPoints += info.points;
        return [mode, { ...result, ...info }];
      }));
      const ltmPlayer = ltmByName.get(player.minecraft.toLowerCase());
      const ltms = {...(ltmPlayer?.results || {})};
      totalPoints += Object.values(ltms).reduce((sum,result)=>sum+result.points,0);
      return { ...player, region:player.region || ltmPlayer?.region, tiers, ltms, totalPoints };
    });
    ranked.sort((a, b) => b.totalPoints - a.totalPoints || a.minecraft.localeCompare(b.minecraft, 'en'));
    return ranked.map((player, index) => ({ ...player, rank: index + 1 }));
  }

  function createLtmButton(count) {
    if (typeof document === 'undefined') throw new Error('createLtmButton requires a browser document');
    const button=document.createElement('button');button.type='button';button.className='kit-item ltm-player-trigger';
    button.setAttribute('aria-label',`View ${count} limited-time tier${count===1?'':'s'}`);
    const icon=document.createElement('div');icon.className='icon ltm-icon';
    const image=document.createElement('img');image.src='assets/ltm.svg';image.width=20;image.alt='LTM';icon.appendChild(image);
    const label=document.createElement('span');label.className='label ltm-label';label.textContent='LTM';
    button.append(icon,label);return button;
  }

  function createBadge(mode, result) {
    if (!own(MODE_ICONS, mode)) throw new TypeError('Unknown mode: ' + String(mode));
    if (typeof document === 'undefined') throw new Error('createBadge requires a browser document');
    const info = tierInfo(result);
    const tierClass = info.tier.toLowerCase();
    const badge = document.createElement('div');
    badge.className = 'kit-item' + (info.retired ? ' retired' : '');
    badge.setAttribute('data-mode', mode);
    badge.setAttribute('data-tooltip', info.tooltip);
    badge.title = info.tooltip;
    badge.setAttribute('aria-label', MODE_LABELS[mode] + ': ' + info.tier + '. ' + info.tooltip.replace('\n', '. '));
    badge.tabIndex = 0;

    const icon = document.createElement('div');
    icon.className = 'icon ' + tierClass;
    const image = document.createElement('img');
    image.src = MODE_ICONS[mode];
    image.width = 20;
    image.alt = MODE_LABELS[mode];
    image.loading = 'lazy';
    icon.appendChild(image);
    const label = document.createElement('span');
    label.className = 'label ' + tierClass;
    label.textContent = info.tier;
    badge.appendChild(icon);
    badge.appendChild(label);
    return badge;
  }

  async function loadData(url) {
    const response = await fetch(url, { cache: 'no-store' });
    if (!response.ok) throw new Error('Could not load tiers JSON (HTTP ' + response.status + ')');
    const data = await response.json();
    if (!isRecord(data) || data.schemaVersion !== 2 || !Array.isArray(data.players)) {
      throw new TypeError('Expected schemaVersion 2 and a players array');
    }
    const ltm=normalizeLtm(data.ltm);
    return {ranking:rankPlayers(data.players,ltm),ltm};
  }

  async function load(url) { return (await loadData(url)).ranking; }

  return Object.freeze({ POINTS_BY_TIER, MODE_ICONS, MODE_LABELS, tierInfo, rankPlayers, createBadge, createLtmButton, normalizeLtm, loadData, load });
});
