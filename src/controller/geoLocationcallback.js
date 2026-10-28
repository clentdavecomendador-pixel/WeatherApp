import { getWeatherAPI } from "../models/fetchWeather.js";
import { getLocation } from "../models/getLocation.js";
import { todaysWeather } from "../views/forecastCard.js";
import { fiveDayForecast } from "../views/forecastDetails.js";

export async function startWeatherForecast(parent) {
    try {
        // This will get the user's location or the fallback location
        const pos = await getLocation()
        // This will get the weather data from Open-Meteo for that location
        const data = await getWeatherAPI(pos.lat, pos.long)

        // This will put the daily data into the format used by todaysWeather
        const dailyForecasts = data.daily.time.map((date, index) => ({
            date,
            temp_max: data.daily.temperature_2m_max[index],
            temp_min: data.daily.temperature_2m_min[index],
            weather_code: data.daily.weather_code[index],
            precipitation_sum: data.daily.precipitation_sum[index],
            wind_direction: data.daily.wind_direction_10m_dominant[index],
            wind_speed_max: data.daily.wind_speed_10m_max[index],
            rain_sum: data.daily.rain_sum[index],
            snowfall_sum: data.daily.snowfall_sum[index]
        }))

        // This will use current weather for today's conditions
        dailyForecasts[0].weather_code = data.current.weather_code
        dailyForecasts[0].wind_direction = data.current.wind_direction_10m
        dailyForecasts[0].wind_speed_max = data.current.wind_speed_10m
        dailyForecasts[0].current_temperature = data.current.temperature_2m
        dailyForecasts[0].current_precipitation = data.current.precipitation

        // This will display today's weather and the five day forecast
        todaysWeather(dailyForecasts, parent, data.daily.time[0])
        fiveDayForecast(data, parent)
    } catch (error) {
        // This will log the error and show a message if the weather could not be loaded
        console.error("Could not load the weather forecast.", error)
        const message = document.createElement("p")
        message.className = "error-message"
        message.setAttribute("role", "alert")
        message.textContent = "Vejret kunne ikke hentes. Kontrollér din internetforbindelse, og prøv igen."
        parent.replaceChildren(message)
    }
}