import { startWeatherForecast } from "./controller/geoLocationcallback.js"
import { headerView } from "./views/header.js"

if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("./sw.js").catch((error) => {
        console.error("Service worker registration failed.", error)
    })
}

const app = document.getElementById("app")

const main = document.createElement("main")
main.id = "forecast"

app.append(headerView(), main)
startWeatherForecast(main)