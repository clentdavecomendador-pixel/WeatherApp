const STATIC_CACHE = "weather-app-static-v3"
const API_CACHE = "weather-app-api-v1"

const FILES = [
    "./",
    "./index.html",
    "./manifest.json",
    "./src/main.js",
    "./src/models/fetchWeather.js",
    "./src/models/getLocation.js",
    "./src/styles/main.css",
    "./src/controller/geoLocationcallback.js",
    "./src/views/forecastCard.js",
    "./src/views/header.js",
    "./src/views/weatherIcons.js",
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
    "./src/assets/weathers/unknown.svg"
].map((path) => new URL(path, self.registration.scope).href)

self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(STATIC_CACHE).then((cache) => cache.addAll(FILES))
    )
})

self.addEventListener("activate", (event) => {
    event.waitUntil(
        caches.keys()
            .then((keys) => Promise.all(
                keys
                    .filter((key) =>
                        key.startsWith("weather-app-") &&
                        key !== STATIC_CACHE &&
                        key !== API_CACHE
                    )
                    .map((key) => caches.delete(key))
            ))
            .then(() => self.clients.claim())
    )
})

async function networkFirst(request) {
    const cache = await caches.open(API_CACHE)

    try {
        const response = await fetch(request)
        if (response.ok) {
            await cache.put(request, response.clone())
            return response
        }

        return await cache.match(request) || response
    } catch (error) {
        const cachedResponse = await cache.match(request)
        if (cachedResponse) return cachedResponse
        throw error
    }
}

async function cacheFirst(request) {
    const cache = await caches.open(STATIC_CACHE)
    const cachedResponse = await cache.match(request)
    if (cachedResponse) return cachedResponse

    const response = await fetch(request)
    if (response.ok) {
        await cache.put(request, response.clone())
    }
    return response
}

self.addEventListener("fetch", (event) => {
    const request = event.request
    if (request.method !== "GET") return

    const url = new URL(request.url)
    if (url.origin === "https://api.open-meteo.com" && url.pathname === "/v1/forecast") {
        event.respondWith(networkFirst(request))
        return
    }

    if (url.origin !== self.location.origin) return
    event.respondWith(cacheFirst(request))
})
