const apiClient = require('../utils/apiClient');

const fetchWeatherData = async (city) => {
    const apiKey = process.env.OPENWEATHER_API_KEY;
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    const response = await apiClient.get(apiUrl);
    return response.data;
};

module.exports = { fetchWeatherData };