const API_KEY = "d8m3ufhr01qkiso5e880d8m3ufhr01qkiso5e88g";

async function loadPrice(symbol, priceId, changeId) {
    try {
        const response = await fetch(
            `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${API_KEY}`
        );

        const data = await response.json();

        const priceElement = document.getElementById(priceId);
        const changeElement = document.getElementById(changeId);

        priceElement.textContent = `€ ${data.c.toFixed(2)}`;

        const percent = data.dp;
        changeElement.textContent = `${percent.toFixed(2)}% vandaag`;

        if (percent >= 0) {
            priceElement.classList.add("positive");
            changeElement.classList.add("positive");
        } else {
            priceElement.classList.add("negative");
            changeElement.classList.add("negative");
        }
    } catch (error) {
        console.error(error);
    }
}

// ASML op Euronext Amsterdam
loadPrice("ASML.AS", "asml-price", "asml-change");

// IWDA op Euronext Amsterdam
loadPrice("IWDA.AS", "iwda-price", "iwda-change");
