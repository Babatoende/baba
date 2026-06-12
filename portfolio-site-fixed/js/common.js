/* ===========================================================
   Gedeelde helpers voor het hele portfolio dashboard
   =========================================================== */

const STORAGE_KEY = "portfolio_holdings_v1";

/* ---------- Opslag (localStorage) ---------- */

function loadHoldings() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.error("Kan portfolio niet laden:", e);
    return [];
  }
}

function saveHoldings(holdings) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(holdings));
}

function addHolding(holding) {
  const holdings = loadHoldings();
  holdings.push({
    id: crypto.randomUUID ? crypto.randomUUID() : String(Date.now()),
    ...holding,
  });
  saveHoldings(holdings);
  return holdings;
}

function removeHolding(id) {
  const holdings = loadHoldings().filter((h) => h.id !== id);
  saveHoldings(holdings);
  return holdings;
}

/* ---------- Formattering ---------- */

function formatCurrency(value, currency = "EUR") {
  if (value === null || value === undefined || isNaN(value)) return "—";
  return new Intl.NumberFormat("nl-BE", {
    style: "currency",
    currency,
    maximumFractionDigits: 2,
  }).format(value);
}

function formatNumber(value, decimals = 2) {
  if (value === null || value === undefined || isNaN(value)) return "—";
  return new Intl.NumberFormat("nl-BE", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value);
}

function formatPercent(value) {
  if (value === null || value === undefined || isNaN(value)) return "—";
  const sign = value > 0 ? "+" : "";
  return `${sign}${formatNumber(value, 2)}%`;
}

function pillClass(value) {
  if (value === null || value === undefined || isNaN(value)) return "flat";
  if (value > 0) return "up";
  if (value < 0) return "down";
  return "flat";
}

/* ---------- Koersen ophalen via Yahoo Finance (publieke endpoint) ---------- */

// Yahoo Finance v8 chart endpoint via een CORS-proxy.
// Geeft huidige koers, vorige slotkoers en munteenheid terug.
async function fetchQuote(symbol) {
  const yahooUrl = `https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(
    symbol
  )}?interval=1d&range=1d`;
  const proxyUrl = `https://corsproxy.io/?url=${encodeURIComponent(yahooUrl)}`;

  const res = await fetch(proxyUrl);
  if (!res.ok) throw new Error(`Netwerkfout (${res.status}) voor ${symbol}`);

  const data = await res.json();
  const result = data?.chart?.result?.[0];
  if (!result) throw new Error(`Geen koersdata gevonden voor ${symbol}`);

  const meta = result.meta;
  return {
    symbol: meta.symbol,
    shortName: meta.shortName || meta.symbol,
    currency: meta.currency || "EUR",
    price: meta.regularMarketPrice,
    previousClose: meta.chartPreviousClose ?? meta.previousClose,
  };
}

// Haal meerdere koersen op, met nette foutafhandeling per symbool.
async function fetchQuotes(symbols) {
  const results = await Promise.allSettled(symbols.map((s) => fetchQuote(s)));
  const map = {};
  results.forEach((r, i) => {
    if (r.status === "fulfilled") {
      map[symbols[i]] = r.value;
    } else {
      map[symbols[i]] = { error: r.reason?.message || "Onbekende fout" };
    }
  });
  return map;
}

/* ---------- Navigatie: actieve link markeren ---------- */

document.addEventListener("DOMContentLoaded", () => {
  const current = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll("nav.main-nav a").forEach((link) => {
    const href = link.getAttribute("href");
    if (href === current || (current === "" && href === "index.html")) {
      link.classList.add("active");
    }
  });
});
