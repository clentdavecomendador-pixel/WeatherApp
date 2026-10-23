import { getWeatherAPI } from "../models/fetchWeather.js"
import { getLocation } from "../models/getLocation.js"
import { buildDay } from "../views/forecastCard.js"

export async function initWeather() {
    try {
        const pos = await getLocation()
        const data = await getWeatherAPI(pos.lat, pos.long)

        console.log(data)

        let myData = dataConversion(data)

        buildDay(myData, document.getElementById("forecast"), "2026-10-24")
    } catch (error) {
        console.error("No data today:", error)
        // kald en view-funktion der viser "Could not fetch"
    }
}

function dataConversion(rawData) {
    let myTimestamps = rawData.daily.time
    let myData = []

    myTimestamps.forEach((element, index) => {
        let myDayData = {
            date: element,
            apparent_temp_min: rawData.daily.apparent_temperature_min[index],
            apparent_temp_max: rawData.daily.apparent_temperature_max[index],
            precipitation_probability_max: rawData.daily.precipitation_probability_max[index],
            precipitation_sum: rawData.daily.precipitation_sum[index],
            temp_max: rawData.daily.temperature_2m_max[index],
            temp_min: rawData.daily.temperature_2m_min[index],
            weather_code: rawData.daily.weather_code[index],
            wind_direction: rawData.daily.wind_direction_10m_dominant[index],
            wind_gusts_max: rawData.daily.wind_gusts_10m_max[index],
            wind_speed_max: rawData.daily.wind_speed_10m_max[index],
        }

        myData.push(myDayData)
    })

    return myData
}