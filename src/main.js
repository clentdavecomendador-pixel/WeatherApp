import { initWeather } from "./controller/geoLocationcallback.js"
import { headerView } from "./views/header.js"

if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("./sw.js")
    console.log("App: service worker registered")
}

const app = document.getElementById("app")

const forecast = document.createElement("div")
forecast.id = "forecast"

app.append(headerView(), initWeather())