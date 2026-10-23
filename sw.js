const CACHE = "static-v2"

const FILES = [
    "./",
    "./index.html",
    "./manifest.json",
    "./src/main.js",
    "./src/models/fetchWeather.js",
    "./src/models/getLocation.js",
    "./src/styles/main.css",
    //#region  all images
    "./src/assets/icons/meteorology.png",
    "./src/assets/icons/weather.png",
    "./src/assets/weathers/clear.svg",
    "./src/assets/weathers/drizzle.svg",
    "./src/assets/weathers/fog.svg",
    "./src/assets/weathers/mostly-clear.svg",
    "./src/assets/weathers/overcast.svg",
    "./src/assets/weathers/partly-cloudy.svg",
    "./src/assets/weathers/rain.svg",
    "./src/assets/weathers/showers.svg",
    "./src/assets/weathers/sleet.svg",
    "./src/assets/weathers/snow-showers.svg",
    "./src/assets/weathers/snow.svg",
    "./src/assets/weathers/thunderstorm-hail.svg",
    "./src/assets/weathers/thunderstorm.svg",
    "./src/assets/weathers/unknown.svg",
    //#endregion all images
    "./src/views/header.js",
    "./src/views/forecastCard.js",
    "./src/views/weatherIcons.js",
    "./src/controller/geoLocationcallback.js"
]

self.addEventListener("install", (event) => {
    console.log("Service worker: installed")

    event.waitUntil(
        caches.open(CACHE).then((cache) => cache.addAll(FILES))
    )
})

self.addEventListener("activate", () => {
    console.log("Service worker: activated")

})

self.addEventListener("fetch", (event) => {
    console.log("Service worker: fetched", event.request.url)

    event.respondWith(
        caches.match(event.request).then((response) => {
            if (response) {
                return response
            } else {
                return fetch(event.request)
            }
        })
    )
})