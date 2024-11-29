const request = require('supertest');
const app = require('../server');
const weatherService = require('../services/weatherService');

jest.mock('../services/weatherService');

describe('GET /api/weather', () => {
    it('should return weather data for a valid city', async () => {
        const mockWeatherData = {
            name: 'London',
            main: { temp: 15 },
            weather: [{ description: 'clear sky' }],
        };

        weatherService.fetchWeatherData.mockResolvedValue(mockWeatherData);

        const response = await request(app).get('/api/weather?city=London');

        expect(response.status).toBe(200);
        expect(response.body).toEqual(mockWeatherData);
    });

    it('should return an error for an invalid city', async () => {
        weatherService.fetchWeatherData.mockRejectedValue(new Error('Error fetching weather data'));

        const response = await request(app).get('/api/weather?city=InvalidCity');

        expect(response.status).toBe(500);
        expect(response.body).toEqual({ error: 'Error fetching weather data' });
    });
});