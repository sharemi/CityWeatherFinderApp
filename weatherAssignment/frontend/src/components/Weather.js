import React, { useState } from 'react';
import axios from 'axios';

const Weather = () => {
    const [city, setCity] = useState('');
    const [weather, setWeather] = useState(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const getWeather = async () => {
        const trimmedCity = city.trim();
        if (!trimmedCity) {
            setError('Please enter a city name');
            setWeather(null);
            return;
        }

        if (!/^[a-zA-Z\s]+$/.test(trimmedCity)) {
            setError('City name can only contain letters and spaces');
            setWeather(null);
            return;
        }

        setLoading(true);
        setError('');
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/weather?city=${trimmedCity}`);
            setWeather(response.data);
            setError('');
        } catch (err) {
            if (err.response && err.response.status === 404) {
                setError('City not found');
            } else {
                setError('Error fetching weather data');
            }
            setWeather(null);
        }
        setLoading(false);
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            getWeather();
        }
    };

    const getWeatherIconUrl = (iconCode) => {
        if (!iconCode) {
            return 'https://openweathermap.org/img/wn/01d@2x.png'; // Default icon
        }
        return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
    };

    return (
        <div className="weather-container">
            <h1>City Weather Finder</h1>
            <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Enter city name"
            />
            <button onClick={getWeather} disabled={loading}>Get Weather</button>
            {loading && <div className="loading">Loading...</div>}
            {error && <p className="error">{error}</p>}
            {weather && (
                <div className="weather-result">
                    <h2>{weather.name}</h2>
                    <p>Temperature: {weather.main.temp}°C</p>
                    <p>Weather: {weather.weather[0].description}</p>
                    <img src={getWeatherIconUrl(weather.weather[0]?.icon)} alt="weather icon" />
                </div>
            )}
            <div className="footer">
                Powered by OpenWeather
            </div>
        </div>
    );
};

export default Weather;