/* ===========================================================
   Homepage: beursnieuws laden
   =========================================================== */

// Gratis RSS-feeds van financieel nieuws, via een RSS-naar-JSON proxy
const NEWS_FEEDS = [
  "https://feeds.marketwatch.com/marketwatch/topstories/",
  "https://www.cnbc.com/id/100003114/device/rss/rss.html",
  "https://feeds.a.dj.com/rss/RSSMarketsMain.xml",
];

const RSS_PROXY = "https://api.rss2json.com/v1/api.json?rss_url=";

async function fetchNewsFeed(feedUrl) {
  const res = await fetch(`${RSS_PROXY}${encodeURIComponent(feedUrl)}`);
  if (!res.ok) throw new Error(`Feed niet bereikbaar: ${feedUrl}`);
  const data = await res.json();
  if (data.status !== "ok") throw new Error(`Feed-fout: ${feedUrl}`);
  return (data.items || []).map((item) => ({
    title: item.title,
    link: item.link,
    source: data.feed?.title || "Onbekende bron",
    pubDate: item.pubDate,
    description: stripHtml(item.description || "").slice(0, 160),
  }));
}

function stripHtml(html) {
  const tmp = document.createElement("div");
  tmp.innerHTML = html;
  return (tmp.textContent || tmp.innerText || "").trim();
}

function timeAgo(dateStr) {
  const diffMs = Date.now() - new Date(dateStr).getTime();
  const diffH = Math.round(diffMs / 36e5);
  if (diffH < 1) return "zojuist";
  if (diffH < 24) return `${diffH} u geleden`;
  const diffD = Math.round(diffH / 24);
  return `${diffD} d geleden`;
}

async function loadNews() {
  const featureEl = document.getElementById("news-feature");
  const sideEl = document.getElementById("news-side");
  const secondaryEl = document.getElementById("news-secondary");
  const noteEl = document.getElementById("refresh-note");

  try {
    const results = await Promise.allSettled(NEWS_FEEDS.map(fetchNewsFeed));
    let articles = [];
    results.forEach((r) => {
      if (r.status === "fulfilled") articles = articles.concat(r.value);
    });

    if (articles.length === 0) throw new Error("Geen artikelen gevonden");

    // Sorteer op datum, nieuwste eerst
    articles.sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate));

    const [feature, ...rest] = articles;
    const sideItems = rest.slice(0, 3);
    const secondaryItems = rest.slice(3, 6);

    // Hoofdartikel
    featureEl.innerHTML = `
      <div>
        <p class="cat">Hoofdartikel · ${feature.source}</p>
        <h3>${escapeHtml(feature.title)}</h3>
        <p>${escapeHtml(feature.description)}</p>
      </div>
      <p class="src"><a href="${feature.link}" target="_blank" rel="noopener">Lees verder →</a> · ${timeAgo(feature.pubDate)}</p>
    `;

    // Zijbalk
    sideEl.innerHTML = sideItems
      .map(
        (a) => `
        <div class="news-row">
          <p class="cat">${escapeHtml(a.source)}</p>
          <h4><a href="${a.link}" target="_blank" rel="noopener">${escapeHtml(a.title)}</a></h4>
          <p class="src">${timeAgo(a.pubDate)}</p>
        </div>`
      )
      .join("");

    // Onderste rij kaarten
    secondaryEl.innerHTML = secondaryItems
      .map(
        (a) => `
        <div class="news-card">
          <p class="cat">${escapeHtml(a.source)}</p>
          <h4><a href="${a.link}" target="_blank" rel="noopener">${escapeHtml(a.title)}</a></h4>
          <p>${escapeHtml(a.description)}</p>
          <p class="src">${timeAgo(a.pubDate)}</p>
        </div>`
      )
      .join("");

    noteEl.textContent = `Bijgewerkt: ${new Date().toLocaleTimeString("nl-BE")} — bronnen: MarketWatch, CNBC, Dow Jones`;
  } catch (err) {
    console.error(err);
    featureEl.innerHTML = `
      <div>
        <p class="cat">Let op</p>
        <h3>Nieuws kon niet geladen worden</h3>
        <p>De nieuwsfeed is momenteel niet bereikbaar. Probeer de pagina te vernieuwen, of controleer je internetverbinding.</p>
      </div>
    `;
    sideEl.innerHTML = "";
    secondaryEl.innerHTML = "";
    noteEl.textContent = "Bijgewerkt: niet gelukt";
  }
}

function escapeHtml(str) {
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}

document.addEventListener("DOMContentLoaded", loadNews);

/* ---------- Mini-tickerbalk met je eigen posities ---------- */

async function loadTickerBar() {
  const el = document.getElementById("ticker-bar");
  const holdings = loadHoldings();
  if (holdings.length === 0) {
    el.innerHTML = `<span style="color: var(--ink-soft)">Voeg posities toe op de pagina "Mijn portfolio" om ze hier te zien.</span>`;
    return;
  }

  const symbols = [...new Set(holdings.map((h) => h.symbol))];
  const quotes = await fetchQuotes(symbols);

  el.innerHTML = symbols
    .map((sym) => {
      const q = quotes[sym];
      if (!q || q.error) {
        return `<div class="tick"><span class="sym">${sym}</span><span class="chg">n.b.</span></div>`;
      }
      const change = ((q.price - q.previousClose) / q.previousClose) * 100;
      const cls = change >= 0 ? "up" : "down";
      const arrow = change >= 0 ? "▲" : "▼";
      return `
        <div class="tick">
          <span class="sym">${sym}</span>
          <span>${formatNumber(q.price)}</span>
          <span class="chg ${cls}">${arrow} ${formatPercent(change)}</span>
        </div>`;
    })
    .join("");
}

document.addEventListener("DOMContentLoaded", loadTickerBar);
