import axios from 'axios'

const baseUrl = 'http://api.weatherapi.com'
const api_key = import.meta.env.VITE_WEATHER_KEY

// Api key on https://www.weatherapi.com/my/

const getWeather = async (city) => {
    const request = axios.get(`${baseUrl}/v1/current.json?q=${city}&key=${api_key}`)
    return request.then(response => response.data.current)
}

export default { getWeather }
