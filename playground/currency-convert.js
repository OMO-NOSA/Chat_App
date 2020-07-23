const axios = require('axios');


const getExchangeRate = async(from, to) => {

    try {
        const response = await axios.get(
            `https://api.exchangeratesapi.io/latest?base=${from}`
        );

        return response.data.rates[to];
    } catch (error) {
        throw new Error('Unable to get rates, please check currencies entered');
    }


}

const getCountries = async(currencyCode) => {

    try {
        const response = await axios.get(`https://restcountries.eu/rest/v2/currency/${currencyCode}`);
        return response.data.map((country) => country.name);
    } catch (error) {
        throw new Error(`Unable to get countries that use ${currencyCode}.`);
    }
};

getCountries('CAD')
    .then((country) => {
        console.log(country);
    })
    .catch((e) => {
        console.log(e.message);
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

const convertCurrencyAlt = async(from, to, amount) => {
    const countries = await getCountries(to);
    const rate = await getExchangeRate(from, to);

    const exchangedAmount = amount * rate;

    return `${amount} ${from} is worth ${exchangedAmount} ${to}. ${to} can be used in the following countries:${countries}`;
};
convertCurrencyAlt('CAD', 'USD', 60)
    .then((rate) => {
        console.log(rate);
    })
    .catch((e) => {
        console.log(e.message);
    });