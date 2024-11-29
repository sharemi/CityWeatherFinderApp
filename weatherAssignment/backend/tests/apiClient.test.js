const apiClient = require('../utils/apiClient');
const axios = require('axios');

jest.mock('axios');

describe('apiClient', () => {
    it('should fetch data from the API', async () => {
        const mockResponse = { data: 'mockData' };
        axios.get.mockResolvedValue(mockResponse);

        const result = await apiClient.get('mockUrl');

        expect(result).toEqual(mockResponse);
    });

    it('should throw an error if the API request fails', async () => {
        axios.get.mockRejectedValue(new Error('Error fetching data'));

        await expect(apiClient.get('mockUrl')).rejects.toThrow('Error fetching data');
    });
});