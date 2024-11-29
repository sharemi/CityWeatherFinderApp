import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Weather from '../components/Weather';
import axios from 'axios';

jest.mock('axios');

test('renders Weather component', () => {
  render(<Weather />);
  expect(screen.getByText(/City Weather Finder/i)).toBeInTheDocument();
});

test('fetches and displays weather data', async () => {
  const weatherData = {
    data: {
      name: 'London',
      main: { temp: 15 },
      weather: [{ description: 'clear sky', icon: '01d' }],
    },
  };

  axios.get.mockResolvedValueOnce(weatherData);

  render(<Weather />);

  fireEvent.change(screen.getByPlaceholderText(/Enter city name/i), {
    target: { value: 'London' },
  });
  fireEvent.click(screen.getByText(/Get Weather/i));

  expect(await screen.findByText(/London/i)).toBeInTheDocument();
  expect(screen.getByText(/Temperature: 15°C/i)).toBeInTheDocument();
  expect(screen.getByText(/clear sky/i)).toBeInTheDocument();
  expect(screen.getByAltText(/weather icon/i)).toBeInTheDocument();
});