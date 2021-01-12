const coinDiv = document.getElementById("coins");
const template = document.querySelector("template").content;

const API_URL = "https://pro-api.coinmarketcap.com/v1/cryptocurrency/map";
const API_KEY = "YOUR_COINMARKETCAP_API_KEY";
const limit = 10;

function setTemplate(coins = []) {
  for (const coin of coins) {
    const date = new Date(coin.first_historical_data).toLocaleDateString();
    const cloneTemplate = template.cloneNode(true);

    cloneTemplate.querySelector("img").alt = coin.name;
    cloneTemplate.querySelector("h2").innerText = coin.name;
    cloneTemplate.querySelector("p").innerText = `${coin.symbol} - ${date}`;

    coinDiv.appendChild(cloneTemplate);
  }
}

async function getCurrencies() {
  const currencies = await fetch(`${API_URL}?limit=${limit}`, {
    headers: { "X-CMC_PRO_API_KEY": API_KEY },
  });

  if (!currencies.ok) {
    throw new Error(`Fail on fetch API. Response status: ${currencies.status}`);
  }

  const jsonCurrencies = await currencies.json();

  setTemplate(jsonCurrencies.data);
}

getCurrencies();
