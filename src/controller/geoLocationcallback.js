import { getWeatherAPI } from "../models/fetchWeather";
import { getLocation } from "../models/getLocation";

export async function startWeatherForecast() {
    try {
        // This will call getLocation and will try to get my GPS coordination if it fail it will get the fallback (myLocation)
        const pos = await getLocation()
        // This will give me raw weather data from my custom function.
        const data = await getWeatherAPI(pos.lat, pos.long)
        
        console.log(data)
    } catch (error) {
        
    }
}