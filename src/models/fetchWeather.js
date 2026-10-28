const api = "https://api.open-meteo.com/v1/forecast"

function buildAPI(lat, long) {
    const params = new URLSearchParams({
        latitude: lat,
        longitude: long,
        daily: "sunrise,sunset,temperature_2m_min,temperature_2m_max,apparent_temperature_min,apparent_temperature_max,precipitation_probability_max,precipitation_sum,weather_code,moonrise,moonset,moon_phase,wind_direction_10m_dominant,wind_speed_10m_max,wind_gusts_10m_max",
        hourly: "weather_code,visibility,cloud_cover,temperature_2m,rain,showers,snowfall,apparent_temperature,wind_speed_10m,wind_direction_10m,wind_gusts_10m,temperature_80m,soil_temperature_6cm,soil_moisture_0_to_1cm",
        timezone: "Europe/Berlin",
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