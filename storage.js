/* ============================================================
   storage.js — Portfolio persistence via localStorage
   ============================================================ */

const Storage = (() => {
  const KEY = 'stockfolio_holdings';

  function getAll() {
    try {
      return JSON.parse(localStorage.getItem(KEY)) || [];
    } catch {
      return [];
    }
  }

  function save(holdings) {
    localStorage.setItem(KEY, JSON.stringify(holdings));
  }

  function add(holding) {
    const holdings = getAll();
    const idx = holdings.findIndex(h => h.symbol === holding.symbol);
    if (idx >= 0) {
      holdings[idx] = { ...holdings[idx], ...holding };
    } else {
      holdings.push(holding);
    }
    save(holdings);
  }

  function remove(symbol) {
    const holdings = getAll().filter(h => h.symbol !== symbol);
    save(holdings);
  }

  function update(symbol, data) {
    const holdings = getAll();
    const idx = holdings.findIndex(h => h.symbol === symbol);
    if (idx >= 0) {
      holdings[idx] = { ...holdings[idx], ...data };
      save(holdings);
    }
  }

  function get(symbol) {
    return getAll().find(h => h.symbol === symbol) || null;
  }

  return { getAll, save, add, remove, update, get };
})();
