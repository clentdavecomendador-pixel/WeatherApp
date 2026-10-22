const api = "https://open-meteo.com/en/docs"

export const fetchData = async () => {
    try {
        const response = await fetch (api)
        if (!response.ok) {
            throw new Error(`Weather API request failed: ${response.status}`)
        }
        const data = await response.json()
        console.log(data)
        return data
    } catch (error) {
        console.error("Could not load the weather forecast:", error)
        return null
    }
}