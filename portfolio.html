/* ===========================================================
   Portfolio-pagina: posities beheren, koersen tonen, winst berekenen
   =========================================================== */

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("add-form");
  form.addEventListener("submit", handleAddHolding);
  renderPortfolio();
});

function handleAddHolding(e) {
  e.preventDefault();

  const symbol = document.getElementById("input-symbol").value.trim().toUpperCase();
  const name = document.getElementById("input-name").value.trim();
  const shares = parseFloat(document.getElementById("input-shares").value);
  const buyPrice = parseFloat(document.getElementById("input-buyprice").value);

  if (!symbol || isNaN(shares) || shares <= 0 || isNaN(buyPrice) || buyPrice <= 0) {
    alert("Vul minstens een geldig ticker-symbool, aantal en aankoopprijs in.");
    return;
  }

  addHolding({
    symbol,
    name: name || symbol,
    shares,
    buyPrice,
  });

  e.target.reset();
  renderPortfolio();
}

async function renderPortfolio() {
  const tbody = document.getElementById("holdings-body");
  const emptyState = document.getElementById("empty-state");
  const tableWrap = document.getElementById("table-wrap");
  const holdings = loadHoldings();

  if (holdings.length === 0) {
    tableWrap.style.display = "none";
    emptyState.style.display = "block";
    updateSummary([], {});
    return;
  }

  tableWrap.style.display = "block";
  emptyState.style.display = "none";

  // Toon eerst de rijen zonder live koers, zodat de gebruiker direct iets ziet
  tbody.innerHTML = holdings
    .map((h) => renderRow(h, null))
    .join("");
  attachRowHandlers();

  // Haal live koersen op
  const symbols = [...new Set(holdings.map((h) => h.symbol))];
  const quotes = await fetchQuotes(symbols);

  tbody.innerHTML = holdings
    .map((h) => renderRow(h, quotes[h.symbol]))
    .join("");
  attachRowHandlers();

  updateSummary(holdings, quotes);
}

function renderRow(holding, quote) {
  const { id, symbol, name, shares, buyPrice } = holding;

  if (!quote || quote.error) {
    return `
      <tr data-id="${id}">
        <td class="name-cell">
          <div class="name">${escapeHtmlPf(name)}</div>
          <div class="ticker">${escapeHtmlPf(symbol)}</div>
        </td>
        <td>${formatNumber(shares)}</td>
        <td>${formatCurrency(buyPrice)}</td>
        <td colspan="4">Koers niet beschikbaar${quote?.error ? " — " + escapeHtmlPf(quote.error) : ""}</td>
        <td class="row-actions"><button data-action="remove">Verwijderen</button></td>
      </tr>`;
  }

  const currentPrice = quote.price;
  const previousClose = quote.previousClose;
  const currency = quote.currency || "EUR";

  const costBasis = shares * buyPrice;
  const currentValue = shares * currentPrice;
  const totalProfit = currentValue - costBasis;
  const totalProfitPct = (totalProfit / costBasis) * 100;

  const dayChangeAbs = currentPrice - previousClose;
  const dayChangePct = (dayChangeAbs / previousClose) * 100;
  const dayProfit = dayChangeAbs * shares;

  return `
    <tr data-id="${id}">
      <td class="name-cell">
        <div class="name">${escapeHtmlPf(name)}</div>
        <div class="ticker">${escapeHtmlPf(symbol)}</div>
      </td>
      <td>${formatNumber(shares)}</td>
      <td>${formatCurrency(buyPrice, currency)}</td>
      <td>${formatCurrency(currentPrice, currency)}</td>
      <td>${formatCurrency(currentValue, currency)}</td>
      <td>
        <span class="pill ${pillClass(dayProfit)}">${formatCurrency(dayProfit, currency)} (${formatPercent(dayChangePct)})</span>
      </td>
      <td>
        <span class="pill ${pillClass(totalProfit)}">${formatCurrency(totalProfit, currency)} (${formatPercent(totalProfitPct)})</span>
      </td>
      <td class="row-actions"><button data-action="remove">Verwijderen</button></td>
    </tr>`;
}

function attachRowHandlers() {
  document.querySelectorAll('button[data-action="remove"]').forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const row = e.target.closest("tr");
      const id = row.dataset.id;
      if (confirm("Deze positie verwijderen uit je portfolio?")) {
        removeHolding(id);
        renderPortfolio();
      }
    });
  });
}

function updateSummary(holdings, quotes) {
  let totalValue = 0;
  let totalCost = 0;
  let totalDayProfit = 0;
  let hasData = false;

  holdings.forEach((h) => {
    const q = quotes[h.symbol];
    if (!q || q.error) return;
    hasData = true;
    const costBasis = h.shares * h.buyPrice;
    const currentValue = h.shares * q.price;
    const dayChangeAbs = q.price - (q.previousClose ?? q.price);

    totalCost += costBasis;
    totalValue += currentValue;
    totalDayProfit += dayChangeAbs * h.shares;
  });

  const totalProfit = totalValue - totalCost;
  const totalProfitPct = totalCost > 0 ? (totalProfit / totalCost) * 100 : 0;
  const dayProfitPct = totalValue - totalDayProfit > 0
    ? (totalDayProfit / (totalValue - totalDayProfit)) * 100
    : 0;

  setSummaryValue("sum-value", hasData ? formatCurrency(totalValue) : "—");
  setSummaryValue(
    "sum-total-profit",
    hasData ? `${formatCurrency(totalProfit)} (${formatPercent(totalProfitPct)})` : "—",
    totalProfit
  );
  setSummaryValue(
    "sum-day-profit",
    hasData ? `${formatCurrency(totalDayProfit)} (${formatPercent(dayProfitPct)})` : "—",
    totalDayProfit
  );
  setSummaryValue("sum-positions", String(holdings.length));
}

function setSummaryValue(id, text, signedValue) {
  const el = document.getElementById(id);
  el.textContent = text;
  el.classList.remove("up", "down");
  if (signedValue !== undefined) {
    if (signedValue > 0) el.classList.add("up");
    if (signedValue < 0) el.classList.add("down");
  }
}

function escapeHtmlPf(str) {
  const div = document.createElement("div");
  div.textContent = str ?? "";
  return div.innerHTML;
}
