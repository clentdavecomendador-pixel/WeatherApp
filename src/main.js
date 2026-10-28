import { initWeather } from "./controller/geoLocationcallback.js"
import { headerView } from "./views/header.js"

if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("./sw.js").catch((error) => {
        console.error("Service worker registration failed.", error)
    })
}

const app = document.getElementById("app")

if (!app) {
    throw new Error("The app root element was not found.")
}

app.append(headerView(), initWeather())