const axios = require('axios');
const config = require('../config');

// eslint-disable-next-line no-unused-vars
function fahrenheitToCelcius(fahrenheit) {
    // eslint-disable-next-line no-mixed-operators
    return (fahrenheit - 32) * 5 / 9;
}

const getInfos = async (town = 'lyon') => {
    const appId = config.openWeatherMapAppId;

    try {
        const endpoint = `https://api.openweathermap.org/data/2.5/weather?q=${town}&appid=${appId}&units=metric`;
        const { data } = await axios.get(endpoint);

        return {
            is: data.weather[0].main,
            temp: data.main.temp,
        };
    } catch (error) {
        console.error(error.message);
        return null;
    }
};


module.exports = { getInfos };
