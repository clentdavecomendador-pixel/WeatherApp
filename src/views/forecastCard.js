import { getWeatherIcon } from "./weatherIcons.js"

const weatherDescriptions = {
    0: "Klart",
    1: "Mest klart",
    2: "Delvist skyet",
    3: "Overskyet",
    45: "Tåge",
    48: "Rimtåge",
    51: "Let støvregn",
    53: "Støvregn",
    55: "Kraftig støvregn",
    56: "Frysende støvregn",
    57: "Kraftig frysende støvregn",
    61: "Let regn",
    63: "Regn",
    65: "Kraftig regn",
    66: "Frysende regn",
    67: "Kraftig frysende regn",
    71: "Let sne",
    73: "Sne",
    75: "Kraftig sne",
    77: "Snefnug",
    80: "Regnbyger",
    81: "Regnbyger",
    82: "Kraftige regnbyger",
    85: "Snebyger",
    86: "Kraftige snebyger",
    95: "Tordenvejr",
    96: "Torden og hagl",
    99: "Kraftigt tordenvejr og hagl"
}

const dayFormatter = new Intl.DateTimeFormat("da-DK", {
    weekday: "long",
    day: "numeric",
    month: "long"
})

const shortDayFormatter = new Intl.DateTimeFormat("da-DK", {
    weekday: "short",
    day: "numeric",
    month: "short"
})

function getDayLabel(date, formatter) {
    return formatter.format(new Date(`${date}T12:00:00`))
}

function getWindDirection(degrees) {
    if (degrees === null || degrees === undefined) return "Ukendt retning"

    const directions = ["N", "NØ", "Ø", "SØ", "S", "SV", "V", "NV"]
    return directions[Math.round(degrees / 45) % directions.length]
}

function getPrecipitationType(day) {
    if (day.snowfall > 0) return "Sne"
    if (day.rain > 0 || day.showers > 0) return "Regn"
    if (day.precipitation > 0) return "Nedbør"
    return "Ingen nedbør"
}

function makeMetric(label, value) {
    const item = document.createElement("div")
    item.className = "weather-metric"

    const term = document.createElement("dt")
    term.textContent = label
    const description = document.createElement("dd")
    description.textContent = value
    item.append(term, description)

    return item
}

function makeWeatherIcon(code, description) {
    const icon = document.createElement("img")
    icon.className = "weather-icon"
    icon.src = getWeatherIcon(code)
    icon.alt = description
    icon.width = 72
    icon.height = 72
    return icon
}

function makeHourlyDetails(day) {
    const details = document.createElement("details")
    details.className = "forecast-details"

    const summary = document.createElement("summary")
    summary.textContent = "Vis detaljer"
    details.append(summary)

    const metrics = document.createElement("dl")
    metrics.className = "weather-metrics"
    metrics.append(
        makeMetric("Temperatur", `${day.temperatureMin}° / ${day.temperatureMax}°`),
        makeMetric("Vindstyrke (10 m)", `${day.windSpeed} m/s`),
        makeMetric("Vindretning", getWindDirection(day.windDirection)),
        makeMetric(
            "Nedbør",
            `${getPrecipitationType(day)} · ${day.precipitation} mm`
        )
    )
    details.append(metrics)

    if (day.hours.length > 0) {
        const heading = document.createElement("h4")
        heading.textContent = "Vejret time for time"
        details.append(heading)

        const hourlyList = document.createElement("ul")
        hourlyList.className = "hourly-list"
        day.hours.forEach((hour) => {
            const item = document.createElement("li")
            const time = document.createElement("time")
            time.textContent = hour.time
            const temperature = document.createElement("span")
            temperature.textContent = `${hour.temperature}°`
            const conditions = document.createElement("span")
            conditions.textContent = weatherDescriptions[hour.weatherCode] ?? "Ukendt vejr"
            const precipitation = document.createElement("span")
            precipitation.textContent = `${hour.precipitation} mm`
            item.append(time, temperature, conditions, precipitation)
            hourlyList.append(item)
        })
        details.append(hourlyList)
    }

    return details
}

export function todaysWeather(day, current, parent) {
    const description = weatherDescriptions[current.weatherCode] ?? "Ukendt vejr"
    const card = document.createElement("section")
    card.className = "today-card"
    card.setAttribute("aria-labelledby", "today-heading")

    const heading = document.createElement("h2")
    heading.id = "today-heading"
    heading.textContent = "I dag"
    const date = document.createElement("p")
    date.className = "today-date"
    date.textContent = getDayLabel(day.date, dayFormatter)

    const summary = document.createElement("div")
    summary.className = "today-summary"
    summary.append(makeWeatherIcon(current.weatherCode, description))

    const conditions = document.createElement("div")
    const temperature = document.createElement("p")
    temperature.className = "today-temperature"
    temperature.textContent = `${current.temperature}°C`
    const range = document.createElement("p")
    range.className = "today-temperature-range"
    range.textContent = `Dagens højeste ${day.temperatureMax}°C · laveste ${day.temperatureMin}°C`
    const weather = document.createElement("p")
    weather.textContent = description
    conditions.append(temperature, range, weather)
    summary.append(conditions)

    const metrics = document.createElement("dl")
    metrics.className = "weather-metrics today-metrics"
    metrics.append(
        makeMetric("Føles som", `${current.apparentTemperature}°C`),
        makeMetric("Vindstyrke (10 m)", `${current.windSpeed} m/s`),
        makeMetric("Vindretning", getWindDirection(current.windDirection)),
        makeMetric(
            "Nedbør",
            `${getPrecipitationType(current)} · ${current.precipitation} mm`
        ),
        makeMetric("Regnsandsynlighed", `${day.precipitationProbability}%`)
    )
    card.append(heading, date, summary, metrics)
    parent.replaceChildren(card)
}

export function fiveDayForecast(days, parent) {
    const section = document.createElement("section")
    section.className = "forecast-section"
    section.setAttribute("aria-labelledby", "forecast-heading")

    const heading = document.createElement("h2")
    heading.id = "forecast-heading"
    heading.textContent = "5-dages oversigt"
    section.append(heading)

    const list = document.createElement("div")
    list.className = "forecast-list"

    days.slice(0, 5).forEach((day, index) => {
        const description = weatherDescriptions[day.weatherCode] ?? "Ukendt vejr"
        const card = document.createElement("article")
        card.className = "forecast-card"

        const title = document.createElement("h3")
        title.textContent = index === 0 ? "I dag" : getDayLabel(day.date, shortDayFormatter)
        const summary = document.createElement("div")
        summary.className = "forecast-summary"
        summary.append(makeWeatherIcon(day.weatherCode, description))

        const info = document.createElement("div")
        const temperature = document.createElement("p")
        temperature.className = "forecast-temperature"
        temperature.textContent = `${day.temperatureMax}°C / ${day.temperatureMin}°C`
        const weather = document.createElement("p")
        weather.textContent = description
        info.append(temperature, weather)
        summary.append(info)

        const details = makeHourlyDetails(day)
        card.append(title, summary, details)
        list.append(card)
    })

    section.append(list)
    parent.replaceChildren(section)
}
