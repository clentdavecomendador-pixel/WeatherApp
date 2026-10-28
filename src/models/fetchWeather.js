const api = "https://api.open-meteo.com/v1/forecast"

function buildAPI(lat, long) {
    const params = new URLSearchParams({
        latitude: lat,
        longitude: long,
        current: "temperature_2m,apparent_temperature,precipitation,rain,showers,snowfall,weather_code,wind_speed_10m,wind_direction_10m",
        daily: "temperature_2m_min,temperature_2m_max,precipitation_probability_max,precipitation_sum,rain_sum,showers_sum,snowfall_sum,weather_code,wind_direction_10m_dominant,wind_speed_10m_max",
        hourly: "temperature_2m,precipitation,precipitation_probability,rain,showers,snowfall,weather_code,wind_speed_10m,wind_direction_10m",
        forecast_days: "5",
        timezone: "auto",
        wind_speed_unit: "ms"
    })
    return `${api}?${params}`
}

export async function getWeatherAPI(lat, long) {
    const response = await fetch(buildAPI(lat, long))

    if (!response.ok) {
        throw new Error(`Open-Meteo error: ${response.status}`)
    }

    const data = await response.json()
    const { current, daily, hourly } = data

    const days = daily.time.map((date, index) => {
        const hours = hourly.time
            .map((time, hourIndex) => ({ time, hourIndex }))
            .filter(({ time }) => time.startsWith(date))
            .filter(({ hourIndex }) => hourIndex % 3 === 0)
            .map(({ time, hourIndex }) => ({
                time: time.slice(11, 16),
                temperature: hourly.temperature_2m[hourIndex],
                precipitation: hourly.precipitation[hourIndex],
                weatherCode: hourly.weather_code[hourIndex]
            }))

        return {
            date,
            temperatureMin: daily.temperature_2m_min[index],
            temperatureMax: daily.temperature_2m_max[index],
            precipitationProbability: daily.precipitation_probability_max[index],
            precipitation: daily.precipitation_sum[index],
            rain: daily.rain_sum[index],
            showers: daily.showers_sum[index],
            snowfall: daily.snowfall_sum[index],
            weatherCode: daily.weather_code[index],
            windDirection: daily.wind_direction_10m_dominant[index],
            windSpeed: daily.wind_speed_10m_max[index],
            hours
        }
    })

    return {
        current: {
            temperature: current.temperature_2m,
            apparentTemperature: current.apparent_temperature,
            precipitation: current.precipitation,
            rain: current.rain,
            showers: current.showers,
            snowfall: current.snowfall,
            weatherCode: current.weather_code,
            windDirection: current.wind_direction_10m,
            windSpeed: current.wind_speed_10m
        },
        days
    }
}