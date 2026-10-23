// fallback hvis vi ikke kan få en position (aalborg friis)
const fallback = { lat: 57.0253, long: 9.5537 }

// Henter brugerens position og returnerer et Promise med { lat, long }.
// Promiset afvises (reject) aldrig – ved fejl får man altid fallback-positionen,
// så den kaldende kode ikke behøver en .catch()


export function getLocation() {
    // opsæt promise så vi kan afvikle flere forskellige processer
    return new Promise((resolve) => {
        // Tjek om browseren overhovedet understøtter geolocation
        if (!navigator.geolocation) {
            console.log("Geolocation is not supported by your browser")
            // return stopper funktionen her, så vi ikke også kalder getCurrentPosition
            return resolve(fallback)
        }

        // Spørg browseren om positionen (brugeren skal give tilladelse).
        // Metoden er asynkron og tager to callbacks: én ved succes og én ved fejl
        navigator.geolocation.getCurrentPosition(
            // Succes: pluk bredde- og længdegrad ud af coords og send dem videre i vores eget format
            (position) => resolve({ lat: position.coords.latitude, long: position.coords.longitude }),

            // Fejl: fx hvis brugeren afviser, eller positionen ikke kan findes
            () => {
                console.log("no pos error")
                resolve(fallback)
            }
        )
    })
}