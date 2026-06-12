/* ============================================================
   api.js — Finnhub API integration
   ============================================================ */

const FinnhubAPI = (() => {
  // ⚠️  Your personal Finnhub API key
  const API_KEY = 'd8m4hohr01qkiso5hjvgd8m4hohr01qkiso5hk00';
  const BASE    = 'https://finnhub.io/api/v1';

  // Simple in-memory cache (per page load) to reduce API calls
  const quoteCache = new Map();

  async function getQuote(symbol) {
    if (quoteCache.has(symbol)) return quoteCache.get(symbol);
    try {
      const r = await fetch(`${BASE}/quote?symbol=${encodeURIComponent(symbol)}&token=${API_KEY}`);
      if (!r.ok) throw new Error(`HTTP ${r.status}`);
      const data = await r.json();
      // data: { c: current, d: change, dp: change%, h, l, o, pc: prev close }
      if (!data || data.c === 0) return null;
      quoteCache.set(symbol, data);
      return data;
    } catch (e) {
      console.warn(`Quote error for ${symbol}:`, e);
      return null;
    }
  }

  async function searchSymbol(query) {
    try {
      const r = await fetch(`${BASE}/search?q=${encodeURIComponent(query)}&token=${API_KEY}`);
      if (!r.ok) throw new Error(`HTTP ${r.status}`);
      const data = await r.json();
      return data.result || [];
    } catch (e) {
      console.warn('Search error:', e);
      return [];
    }
  }

  async function getCompanyProfile(symbol) {
    try {
      const r = await fetch(`${BASE}/stock/profile2?symbol=${encodeURIComponent(symbol)}&token=${API_KEY}`);
      if (!r.ok) throw new Error(`HTTP ${r.status}`);
      return await r.json();
    } catch {
      return null;
    }
  }

  // Fetch quotes for multiple symbols — returns a map { symbol: quoteData }
  async function getBatchQuotes(symbols) {
    const results = {};
    // Fetch in parallel but respect rate limits (60 calls/min on free tier)
    const chunks = chunkArray(symbols, 10);
    for (const chunk of chunks) {
      const promises = chunk.map(async sym => {
        const q = await getQuote(sym);
        if (q) results[sym] = q;
      });
      await Promise.all(promises);
    }
    return results;
  }

  function chunkArray(arr, size) {
    const chunks = [];
    for (let i = 0; i < arr.length; i += size) chunks.push(arr.slice(i, i + size));
    return chunks;
  }

  // Clear quote cache (call before refresh)
  function clearCache() { quoteCache.clear(); }

  return { getQuote, searchSymbol, getCompanyProfile, getBatchQuotes, clearCache };
})();

/* ── Formatting helpers (shared across pages) ── */

const Fmt = {
  // Format as currency with € sign
  currency(value, currency = 'EUR', decimals = 2) {
    if (value === null || value === undefined || isNaN(value)) return '—';
    const symbols = { EUR: '€', USD: '$', GBP: '£' };
    const sym = symbols[currency] || currency + ' ';
    const abs = Math.abs(value);
    const formatted = abs.toLocaleString('nl-NL', { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
    return (value < 0 ? '-' : '') + sym + formatted;
  },

  // Format as percentage
  pct(value, decimals = 2) {
    if (value === null || isNaN(value)) return '—';
    return (value >= 0 ? '+' : '') + value.toFixed(decimals) + '%';
  },

  // Format a plain number
  number(value, decimals = 2) {
    if (value === null || isNaN(value)) return '—';
    return value.toLocaleString('nl-NL', { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
  },

  // Timestamp
  time() {
    return new Date().toLocaleTimeString('nl-NL', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  }
};
