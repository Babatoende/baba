const API_KEY = "d8m3ufhr01qkiso5e880d8m3ufhr01qkiso5e88g";

async function loadPrice(symbol, elementId) {
    const response = await fetch(
        `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${API_KEY}`
    );

    const data = await response.json();

    document.getElementById(elementId).innerText =
        `€ ${data.c.toFixed(2)}`;
}

loadPrice("ASML.AS", "asml-price");
loadPrice("IWDA.AS", "iwda-price");
