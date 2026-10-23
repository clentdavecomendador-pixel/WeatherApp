// This is my location ( Aalborg Friis)
const myLocation = { lat: 57.0253, long: 9.5537 }

export function getLocation() {
    // The function never rejects. It always resolve with {lat: ..., long: ...}, either from the user's device or from 'myLocation'
    return new Promise((resolve) => {
        // This will check if your browser support geolocator
        if (!navigator.geolocation) {
            console.log("Geolocator is not supported by your browser")

            // The return stops the function, preventing it to call for our current location
            return resolve(myLocation)
        }

        // Ask the browser for permission get the user's location
        // getCurrentPosition is already built-in function from Geolocator API
        navigator.geolocation.getCurrentPosition(
            // This run the success callback
            (position) => resolve({ lat: position.coords.latitude, long: position.coords.longitude }),
            () => {
                // This will only run when the user refuse to give us the location
                console.log("no pos error")

                resolve(myLocation)
            }
        )
    })
}

