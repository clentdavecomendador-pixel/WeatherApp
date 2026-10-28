import { getWeatherIcon, getWeatherDescription } from "./weatherIcons.js"

export function todaysWeather(myData, myParentData, myDate) {
    // This allow me to display a date
    // Which is why it's empty
    let displayDate = ""

    console.log(myData)
    // If given a date then it will be in displayDate
    if (myDate) {
        displayDate = myDate
    } else {
        // If not given a date use today's date to be displayed
        let currentDate = new Date();
        let year = currentDate.getFullYear();
        // The code will always be in string. Because the code start the month at 0, + 1 allows it to match with our month the padStart(2, '0') make it so it display in 2 digits
        let month = String(currentDate.getMonth() + 1).padStart(2, '0');
        let day = String(currentDate.getDate()).padStart(2, '0')
        displayDate = `${year}-${month}-${day}`;
    }

    console.log(displayDate)

    let today = myData.find(dayData => dayData.date === displayDate);

    if (!today) {
        console.error("No data found for", displayDate);
        return;
    }

    console.log(today)

    let todaysCard = document.createElement("section")
    todaysCard.className = "today-card"

    // This will display the date that was selected for the card
    let heading = document.createElement("h2")
    heading.textContent = `I dag · ${displayDate}`

    // This will display the weather icon and the weather type for the day
    let condition = document.createElement("p")
    condition.className = "weather-condition"
    let todaysWeatherIcon = document.createElement("img")
    todaysWeatherIcon.src = getWeatherIcon(today.weather_code)
    todaysWeatherIcon.alt = getWeatherDescription(today.weather_code)
    condition.append(todaysWeatherIcon, document.createTextNode(getWeatherDescription(today.weather_code)))

    let weatherDetails = document.createElement("div")
    weatherDetails.className = "weather-metrics"

    // This will make one label and value for each weather detail
    const addMetric = (label, value) => {
        const metric = document.createElement("p")
        metric.className = "weather-metric"
        const name = document.createElement("span")
        name.textContent = label
        const reading = document.createElement("strong")
        reading.textContent = value
        metric.append(name, reading)
        weatherDetails.append(metric)
    }

    // These are the minimum details needed to show today's weather
    addMetric("Temperatur nu", `${today.current_temperature ?? today.temp_max} °C`)
    addMetric("Dagens min. / maks.", `${today.temp_min} / ${today.temp_max} °C`)
    addMetric("Vindstyrke (10 m)", `${today.wind_speed_max} m/s`)
    addMetric("Vindretning", `${today.wind_direction}°`)
    addMetric("Nedbør", `${today.current_precipitation ?? today.precipitation_sum} mm`)
    addMetric("Nedbørssandsynlighed", `${today.precipitation_probability_max ?? "—"} %`)
    addMetric("Regn / sne", `${today.rain_sum} / ${today.snowfall_sum} mm`)

    todaysCard.append(heading, condition, weatherDetails)

    // This will clear the old weather and display today's card
    myParentData.innerHTML = ""
    myParentData.append(todaysCard)

    /*apparent_temp_max
: 
10.6
apparent_temp_min
: 
6
date
: 
"2026-10-23"
precipitation_probability_max
: 
86
precipitation_sum
: 
0.8
temp_max
: 
12.3
temp_min
: 
7.8
weather_code
: 
51
wind_direction
: 
150
wind_gusts_max
: 
11.6
wind_speed_max
: 
6.4*/
}
