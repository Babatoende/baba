const API_KEY = "d8m3ufhr01qkiso5e880d8m3ufhr01qkiso5e88g";

async function loadPrice(symbol, priceId, changeId) {

    const priceElement = document.getElementById(priceId);
    const changeElement = document.getElementById(changeId);

    try {

        const response = await fetch(
            `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${API_KEY}`
        );

        console.log(symbol, response.status);

        if (!response.ok) {
            priceElement.textContent = "API fout";
            priceElement.classList.add("error");
            return;
        }

        const data = await response.json();

        console.log(symbol, data);

        if (!data.c || data.c === 0) {
            priceElement.textContent = "Geen data";
            priceElement.classList.add("error");
            return;
        }

        priceElement.textContent = `€ ${data.c.toFixed(2)}`;

        const percent = data.dp || 0;

        changeElement.textContent =
            `${percent.toFixed(2)}% vandaag`;

        if (percent >= 0) {
            priceElement.classList.add("positive");
            changeElement.classList.add("positive");
        } else {
            priceElement.classList.add("negative");
            changeElement.classList.add("negative");
        }

    } catch (err) {

        console.error(err);

        priceElement.textContent = "Verbinding fout";
        priceElement.classList.add("error");
    }
}

/*
Test eerst met Amerikaanse aandelen.
Als dit werkt, is je API-key correct.
*/

loadPrice("AAPL", "asml-price", "asml-change");
loadPrice("MSFT", "iwda-price", "iwda-change");
