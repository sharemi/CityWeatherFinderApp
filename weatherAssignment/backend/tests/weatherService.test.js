const weatherService = require('../services/weatherService');
const apiClient = require('../utils/apiClient');

jest.mock('../utils/apiClient');

describe('fetchWeatherData', () => {
    it('should fetch weather data for a valid city', async () => {
        const mockWeatherData = {
            data: {
                name: 'London',
                main: { temp: 15 },
                weather: [{ description: 'clear sky' }],
            },
        };

        apiClient.get.mockResolvedValue(mockWeatherData);

        const result = await weatherService.fetchWeatherData('London');

        expect(result).toEqual(mockWeatherData.data);
    });

    it('should throw an error for an invalid city', async () => {
        apiClient.get.mockRejectedValue(new Error('Error fetching weather data'));

        await expect(weatherService.fetchWeatherData('InvalidCity')).rejects.toThrow('Error fetching weather data');
    });
});