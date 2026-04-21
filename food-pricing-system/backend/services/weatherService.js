const axios = require('axios');

// Using mock weather data if API key is not present or if API fails
const OPENWEATHER_API_KEY = process.env.OPENWEATHER_API_KEY;
const CITY = process.env.CITY || 'London';

const mockWeathers = [
    { temp: 32, condition: 'Clear', description: 'sunny and hot', isMock: true },
    { temp: 18, condition: 'Rain', description: 'light rain', isMock: true },
    { temp: 12, condition: 'Clouds', description: 'overcast and chilly', isMock: true },
    { temp: 24, condition: 'Clear', description: 'pleasant breeze', isMock: true }
];

let weatherIndex = 0;

// Real-time or simulated weather fetching
const getWeather = async () => {
    if (!OPENWEATHER_API_KEY) {
        // Cycle through mocks for the demo
        const weather = mockWeathers[weatherIndex];
        weatherIndex = (weatherIndex + 1) % mockWeathers.length;
        return weather;
    }

    try {
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${CITY}&appid=${OPENWEATHER_API_KEY}&units=metric`);
        const data = response.data;
        return {
            temp: data.main.temp,
            condition: data.weather[0].main,
            description: data.weather[0].description,
            isMock: false
        };
    } catch (error) {
        console.error('Error fetching weather data:', error.message);
        // Fallback to safe defaults
        return {
            temp: 25,
            condition: 'Clear',
            description: 'default',
            isMock: true
        };
    }
};

module.exports = { getWeather };
