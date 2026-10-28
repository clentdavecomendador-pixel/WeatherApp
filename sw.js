const STATIC_CACHE = "weather-static-v3"
const API_CACHE = "weather-api-v1"

const FILES = [
    "./",
    "./index.html",
    "./manifest.json",
    "./src/main.js",
    "./src/controller/geoLocationcallback.js",
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
    "./src/views/forecastDetails.js",
    "./src/views/weatherIcons.js",
]

self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(STATIC_CACHE).then((cache) => cache.addAll(FILES))
    )
})

self.addEventListener("activate", (event) => {
    event.waitUntil(
        caches.keys().then((keys) => Promise.all(
            keys
                .filter((key) => key.startsWith("weather-") && ![STATIC_CACHE, API_CACHE].includes(key))
                .map((key) => caches.delete(key))
        ))
    )
})

self.addEventListener("fetch", (event) => {
    const request = event.request
    if (request.method !== "GET") return

    const url = new URL(request.url)
    if (url.origin === "https://api.open-meteo.com") {
        event.respondWith(networkFirst(request))
        return
    }

    if (url.origin === self.location.origin) {
        event.respondWith(cacheFirst(request))
    }
})

async function networkFirst(request) {
    const cache = await caches.open(API_CACHE)
    let response
    try {
        response = await fetch(request)
    } catch (error) {
        const cached = await cache.match(request)
        if (cached) return cached
        throw error
    }

    if (response.ok) {
        await cache.put(request, response.clone())
        return response
    }

    if (response.status < 500) return response
    return (await cache.match(request)) ?? response
}

async function cacheFirst(request) {
    const cache = await caches.open(STATIC_CACHE)
    const cached = await cache.match(request)
    if (cached) return cached

    const response = await fetch(request)
    if (response.ok) await cache.put(request, response.clone())
    return response
}