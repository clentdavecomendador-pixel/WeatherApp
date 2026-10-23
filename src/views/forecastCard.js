import { getWeatherIcon } from "./weatherIcons.js"

export function buildDay(myData, myParentElement, myDate) {
    let formattedDate = ""

    console.log(myData)
    if (myDate) {
        formattedDate = myDate
    } else {
        let currentDate = new Date()
        let year = currentDate.getFullYear()
        let month = String(currentDate.getMonth() + 1).padStart(2, "0")
        let day = String(currentDate.getDate()).padStart(2, "0")
        formattedDate = `${year}-${month}-${day}`
    }

    console.log(formattedDate)

    let today = myData.find(dayData => dayData.date === formattedDate)

    if (!today) {
        console.error("No data found for", formattedDate)
        return
    }

    console.log(today)

    let myDayCard = document.createElement("section")
    let myWeatherIcon = getWeatherIcon(today.weather_code)

    myDayCard.innerHTML = `<img src="${myWeatherIcon}"><h2>${today.temp_max}</h2><h4>${today.temp_min}</h4>`

    myParentElement.innerHTML = ""
    myParentElement.appendChild(myDayCard)

    /*
    {
        apparent_temp_max: 10.6,
        apparent_temp_min: 6,
        date: "2026-10-23",
        precipitation_probability_max: 86,
        precipitation_sum: 0.8,
        temp_max: 12.3,
        temp_min: 7.8,
        weather_code: 51,
        wind_direction: 150,
        wind_gusts_max: 11.6,
        wind_speed_max: 6.4
    }
    */
}