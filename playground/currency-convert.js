const axios = require('axios');


const getExchangeRate = (from, to) => {
    return axios
        .get(`https://api.exchangeratesapi.io/latest?base=${from}`)
        .then((response) => {
            return response.data.rates[to];
        });
}

const getCountries = (currencyCode) => {
    return axios.get(`https://restcountries.eu/rest/v2/currency/${currencyCode}`).then((response) => {
            return response.data.map((country) => country.name);
        }

    );
};

getCountries('CAD')
    .then((country) => {
        console.log(country);
    })
    .catch((e) => {
        console.log(e);
    });



const convertCurrency = (from, to, amount) => {
    let countries;
    return getCountries(to)
        .then((tempCountries) => {
            countries = tempCountries;
            return getExchangeRate(from, to);
        })
        .then((rate) => {
            const exchangedAmount = amount * rate;

            return `${amount} ${from} is worth ${exchangedAmount} ${to}. ${to} can be used in the following countries:${countries}`;
        });
};
convertCurrency("USD", "CAD", 60)
    .then((rate) => {
        console.log(rate);
    })
    .catch((e) => {
        console.log(e);
    });