// Aalborg is used when browser location access is unavailable or declined.
const myLocation = { lat: 57.0253, long: 9.5537 }

export function getLocation() {
    return new Promise((resolve) => {
        if (!navigator.geolocation) {
            return resolve(myLocation)
        }

        navigator.geolocation.getCurrentPosition(
            (position) => resolve({ lat: position.coords.latitude, long: position.coords.longitude }),
            () => resolve(myLocation),
            { timeout: 10000, maximumAge: 300000 }
        )
    })
}
