import { getWeatherAPI } from "../models/fetchWeather.js"
import { getLocation } from "../models/getLocation.js"
import { fiveDayForecast, todaysWeather } from "../views/forecastCard.js"

export function initWeather() {
    const main = document.createElement("main")
    main.className = "weather-app"

    const status = document.createElement("p")
    status.className = "app-status"
    status.setAttribute("role", "status")
    status.setAttribute("aria-live", "polite")
    status.textContent = "Henter vejrudsigten for din placering…"
    main.append(status)

    startWeatherForecast(main, status)
    return main
}

async function startWeatherForecast(main, status) {
    try {
        const pos = await getLocation()
        const { current, days } = await getWeatherAPI(pos.lat, pos.long)

        if (days.length === 0) {
            throw new Error("Open-Meteo returned no daily forecasts.")
        }

        status.remove()
        const today = document.createElement("div")
        today.className = "today-section"
        const upcoming = document.createElement("div")
        upcoming.className = "upcoming-section"
        main.append(today, upcoming)

        todaysWeather(days[0], current, today)
        fiveDayForecast(days, upcoming)
    } catch (error) {
        console.error("Unable to load the weather forecast.", error)
        status.className = "app-status app-status-error"
        status.textContent = "Vejrudsigten kunne ikke hentes. Kontrollér din internetforbindelse, og prøv igen."
    }
}