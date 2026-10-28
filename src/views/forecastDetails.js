import { getWeatherIcon, getWeatherDescription } from "./weatherIcons.js"

function metric(label, value) {
    const item = document.createElement("p")
    item.className = "weather-metric"
    const name = document.createElement("span")
    name.textContent = label
    const reading = document.createElement("strong")
    reading.textContent = value
    item.append(name, reading)
    return item
}

function windDirection(degrees) {
    const directions = ["N", "NØ", "Ø", "SØ", "S", "SV", "V", "NV"]
    return `${directions[Math.round(degrees / 45) % 8]} (${Math.round(degrees)}°)`
}

function hourlyDetails(data, date) {
    const details = document.createElement("details")
    details.className = "day-details"
    const summary = document.createElement("summary")
    summary.textContent = "Vis timedetaljer"
    const hours = document.createElement("div")
    hours.className = "hourly-list"
    details.append(summary, hours)

    data.hourly.time.forEach((time, index) => {
        if (!time.startsWith(date) || Number(time.slice(11, 13)) % 6 !== 0) return

        const row = document.createElement("article")
        row.className = "hourly-item"
        const heading = document.createElement("h4")
        heading.textContent = time.slice(11, 16)
        const icon = document.createElement("img")
        icon.src = getWeatherIcon(data.hourly.weather_code[index])
        icon.alt = getWeatherDescription(data.hourly.weather_code[index])
        row.append(
            heading,
            icon,
            metric("Temperatur", `${data.hourly.temperature_2m[index]} °C`),
            metric("Vind", `${data.hourly.wind_speed_10m[index]} m/s`),
            metric("Vindretning", windDirection(data.hourly.wind_direction_10m[index])),
            metric("Nedbør", `${data.hourly.precipitation[index]} mm`),
            metric("Regn / sne", `${data.hourly.rain[index]} / ${data.hourly.snowfall[index]} cm`)
        )
        hours.append(row)
    })

    return details
}

export function fiveDayForecast(data, parent) {
    const heading = document.createElement("h2")
    heading.textContent = "5-dages oversigt"

    const forecast = document.createElement("section")
    forecast.className = "forecast-grid"
    forecast.setAttribute("aria-label", "Vejrudsigt for fem dage")

    data.daily.time.forEach((date, index) => {
        const card = document.createElement("article")
        card.className = "forecast-card"

        const title = document.createElement("h3")
        title.textContent = new Intl.DateTimeFormat("da-DK", {
            weekday: "long",
            day: "numeric",
            month: "long"
        }).format(new Date(`${date}T12:00:00`))

        const condition = document.createElement("p")
        condition.className = "weather-condition"
        const icon = document.createElement("img")
        icon.src = getWeatherIcon(data.daily.weather_code[index])
        icon.alt = getWeatherDescription(data.daily.weather_code[index])
        condition.append(icon, document.createTextNode(getWeatherDescription(data.daily.weather_code[index])))

        const metrics = document.createElement("div")
        metrics.className = "weather-metrics"
        metrics.append(
            metric("Temperatur min. / maks.", `${data.daily.temperature_2m_min[index]} / ${data.daily.temperature_2m_max[index]} °C`),
            metric("Vindstyrke (10 m)", `${data.daily.wind_speed_10m_max[index]} m/s`),
            metric("Vindretning", windDirection(data.daily.wind_direction_10m_dominant[index])),
            metric("Nedbør", `${data.daily.precipitation_sum[index]} mm`),
            metric("Nedbørssandsynlighed", `${data.daily.precipitation_probability_max[index]} %`),
            metric("Regn / sne", `${data.daily.rain_sum[index]} / ${data.daily.snowfall_sum[index]} cm`)
        )

        card.append(title, condition, metrics, hourlyDetails(data, date))
        forecast.append(card)
    })

    parent.append(heading, forecast)
}
