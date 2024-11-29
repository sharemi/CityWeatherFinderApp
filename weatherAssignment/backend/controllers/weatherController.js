const weatherService = require('../services/weatherService');

const getWeather = async (req, res) => {
    const city = req.query.city;
    try {
        const weatherData = await weatherService.fetchWeatherData(city);
        res.json(weatherData);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching weather data' });
    }
};

module.exports = { getWeather };