const api = "https://api.open-meteo.com/v1/forecast"

function buildAPI(lat, long) {
    const params = new URLSearchParams({
        latitude: lat,
        longitude: long,
        current: "temperature_2m,precipitation,rain,showers,snowfall,weather_code,wind_speed_10m,wind_direction_10m",
        daily: "temperature_2m_min,temperature_2m_max,precipitation_probability_max,precipitation_sum,rain_sum,showers_sum,snowfall_sum,weather_code,wind_direction_10m_dominant,wind_speed_10m_max",
        hourly: "weather_code,temperature_2m,precipitation,rain,showers,snowfall,wind_speed_10m,wind_direction_10m",
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

    return response.json()
}