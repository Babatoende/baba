/* ============================================================
   portfolio.js — Portfolio page logic
   ============================================================ */

(async () => {
  const $ = id => document.getElementById(id);

  const els = {
    totalValue:       $('totalValue'),
    totalGain:        $('totalGain'),
    dailyGain:        $('dailyGain'),
    totalReturn:      $('totalReturn'),
    emptyState:       $('emptyState'),
    holdingsSection:  $('holdingsSection'),
    holdingsBody:     $('holdingsBody'),
    allocationSection:$('allocationSection'),
    allocationGrid:   $('allocationGrid'),
    positionsCount:   $('positionsCount'),
    lastUpdated:      $('lastUpdated'),
    refreshBtn:       $('refreshBtn'),
    loadingOverlay:   $('loadingOverlay'),
  };

  let quotesCache = {};

  // ── Entry point ──────────────────────────────────────────

  async function init() {
    const holdings = Storage.getAll();
    if (holdings.length === 0) {
      showEmpty();
      hideLoading();
      return;
    }
    showLoading();
    await loadData(holdings);
    hideLoading();
  }

  async function loadData(holdings) {
    FinnhubAPI.clearCache();
    const symbols = holdings.map(h => h.symbol);
    quotesCache = await FinnhubAPI.getBatchQuotes(symbols);
    renderAll(holdings);
    els.lastUpdated.textContent = 'Bijgewerkt ' + Fmt.time();
  }

  // ── Render ───────────────────────────────────────────────

  function renderAll(holdings) {
    if (!holdings.length) { showEmpty(); return; }

    hideEmpty();
    els.holdingsSection.style.display  = '';
    els.allocationSection.style.display = '';

    els.holdingsBody.innerHTML    = '';
    els.allocationGrid.innerHTML  = '';

    let totalValue = 0, totalCost = 0, totalDailyGain = 0;

    holdings.forEach(h => {
      const q = quotesCache[h.symbol];
      const currentPrice   = q ? q.c  : null;
      const prevClose      = q ? q.pc : null;
      const dayChange      = q ? q.d  : null;
      const dayChangePct   = q ? q.dp : null;

      const shares         = parseFloat(h.shares)   || 0;
      const avgBuy         = parseFloat(h.avgPrice) || 0;

      const marketValue    = currentPrice !== null ? currentPrice * shares : null;
      const costBasis      = avgBuy * shares;
      const totalPnL       = (marketValue !== null && costBasis) ? marketValue - costBasis : null;
      const totalPnLPct    = (totalPnL !== null && costBasis)    ? (totalPnL / costBasis) * 100 : null;
      const dailyGainPos   = (dayChange !== null)                ? dayChange * shares : null;

      if (marketValue)  totalValue    += marketValue;
      if (costBasis)    totalCost     += costBasis;
      if (dailyGainPos) totalDailyGain += dailyGainPos;

      els.holdingsBody.appendChild(buildRow(h, currentPrice, dayChange, dayChangePct, marketValue, costBasis, totalPnL, totalPnLPct));
    });

    // Summary strip
    const grandPnL    = totalValue - totalCost;
    const grandPnLPct = totalCost ? (grandPnL / totalCost) * 100 : 0;

    els.totalValue.textContent = Fmt.currency(totalValue);
    setGainLoss(els.totalGain,  grandPnL,    Fmt.currency(grandPnL));
    setGainLoss(els.dailyGain,  totalDailyGain, Fmt.currency(totalDailyGain));
    els.totalReturn.textContent = Fmt.pct(grandPnLPct);
    els.totalReturn.className   = 'summary-value ' + gainClass(grandPnLPct);

    els.positionsCount.textContent = holdings.length + ' ' + (holdings.length === 1 ? 'positie' : 'posities');

    // Allocation
    renderAllocation(holdings, totalValue);
  }

  function buildRow(h, currentPrice, dayChange, dayChangePct, marketValue, costBasis, totalPnL, totalPnLPct) {
    const tr = document.createElement('tr');

    const dayUp   = dayChange > 0;
    const dayDown = dayChange < 0;
    const dayBadge = dayChange !== null
      ? `<span class="badge-change ${dayUp ? 'up' : dayDown ? 'down' : 'flat'}">
           ${dayUp ? '▲' : dayDown ? '▼' : '—'} ${Fmt.pct(dayChangePct)}
         </span>`
      : '<span class="badge-change flat">—</span>';

    const pnlClass   = totalPnL !== null ? gainClass(totalPnL) : '';
    const pnlDisplay = totalPnL !== null
      ? `${Fmt.currency(totalPnL)} <span style="font-size:11px;opacity:0.7">${Fmt.pct(totalPnLPct)}</span>`
      : '—';

    tr.innerHTML = `
      <td class="td-symbol">${h.symbol}</td>
      <td class="td-name">${escHtml(h.name || h.symbol)}</td>
      <td class="td-mono">${Fmt.number(h.shares, 4)}</td>
      <td class="td-mono">${h.avgPrice ? Fmt.currency(h.avgPrice, h.currency || 'EUR', 2) : '—'}</td>
      <td class="td-mono">${currentPrice !== null ? Fmt.currency(currentPrice, 'USD', 2) : '—'}</td>
      <td class="td-mono">${marketValue  !== null ? Fmt.currency(marketValue, 'USD', 2) : '—'}</td>
      <td>${dayBadge}</td>
      <td class="td-${pnlClass || 'neutral'}">${pnlDisplay}</td>
      <td class="${pnlClass ? 'td-' + pnlClass : 'td-neutral'}">${Fmt.pct(totalPnLPct)}</td>
      <td>
        <button class="delete-btn" data-symbol="${h.symbol}" title="Verwijder positie">✕</button>
      </td>`;

    tr.querySelector('.delete-btn').addEventListener('click', e => {
      const sym = e.target.dataset.symbol;
      if (confirm(`Verwijder ${sym} uit je portfolio?`)) {
        Storage.remove(sym);
        init();
      }
    });

    return tr;
  }

  function renderAllocation(holdings, totalValue) {
    if (!totalValue) return;
    holdings.forEach(h => {
      const q = quotesCache[h.symbol];
      if (!q) return;
      const mv  = q.c * (parseFloat(h.shares) || 0);
      const pct = (mv / totalValue) * 100;

      const div = document.createElement('div');
      div.className = 'alloc-card';
      div.innerHTML = `
        <span class="alloc-symbol">${h.symbol}</span>
        <span class="alloc-pct">${pct.toFixed(1)}%</span>
        <div class="alloc-bar-track">
          <div class="alloc-bar-fill" style="width:0%" data-target="${pct}"></div>
        </div>
        <div class="alloc-value">${Fmt.currency(mv, 'USD', 0)}</div>`;
      els.allocationGrid.appendChild(div);

      // Animate bar
      requestAnimationFrame(() => {
        setTimeout(() => {
          div.querySelector('.alloc-bar-fill').style.width = pct + '%';
        }, 80);
      });
    });
  }

  // ── Helpers ──────────────────────────────────────────────

  function gainClass(v) { return v > 0 ? 'gain' : v < 0 ? 'loss' : 'neutral'; }

  function setGainLoss(el, value, text) {
    el.textContent = value >= 0 ? '+' + text : text;
    el.className = 'summary-value ' + gainClass(value);
  }

  function showEmpty()  {
    els.emptyState.style.display       = '';
    els.holdingsSection.style.display  = 'none';
    els.allocationSection.style.display = 'none';
  }
  function hideEmpty()  { els.emptyState.style.display = 'none'; }
  function showLoading(){ els.loadingOverlay.style.display = 'flex'; }
  function hideLoading(){ els.loadingOverlay.style.display = 'none'; }

  function escHtml(str) {
    return String(str).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  }

  // ── Refresh button ────────────────────────────────────────

  els.refreshBtn.addEventListener('click', async () => {
    els.refreshBtn.classList.add('spinning');
    showLoading();
    FinnhubAPI.clearCache();
    await init();
    hideLoading();
    setTimeout(() => els.refreshBtn.classList.remove('spinning'), 600);
  });

  // ── Auto refresh every 60 s ───────────────────────────────

  setInterval(() => {
    const holdings = Storage.getAll();
    if (holdings.length) {
      FinnhubAPI.clearCache();
      loadData(holdings);
    }
  }, 60_000);

  await init();
})();
