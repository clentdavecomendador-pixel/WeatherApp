const iconFolder = "./src/assets/weathers/"

export function getWeatherIcon(code) {
    let iconName

    switch (code) {
        case 0: // Clear sky
            iconName = "clear"
            break

        case 1: // Mainly clear
            iconName = "mostly-clear"
            break

        case 2: // Partly cloudy
            iconName = "partly-cloudy"
            break

        case 3: // Overcast
            iconName = "overcast"
            break

        case 45: // Fog
        case 48: // Depositing rime fog
            iconName = "fog"
            break

        case 51: // Drizzle: light, moderate, dense
        case 53:
        case 55:
            iconName = "drizzle"
            break

        case 56: // Freezing drizzle: light, dense
        case 57:
        case 66: // Freezing rain: light, heavy
        case 67:
            iconName = "sleet"
            break

        case 61: // Rain: slight, moderate, heavy
        case 63:
        case 65:
            iconName = "rain"
            break

        case 71: // Snow fall: slight, moderate, heavy
        case 73:
        case 75:
        case 77: // Snow grains
            iconName = "snow"
            break

        case 80: // Rain showers: slight, moderate, violent
        case 81:
        case 82:
            iconName = "showers"
            break

        case 85: // Snow showers: slight, heavy
        case 86:
            iconName = "snow-showers"
            break

        case 95: // Thunderstorm
            iconName = "thunderstorm"
            break

        case 96: // Thunderstorm with hail: slight, heavy
        case 99:
            iconName = "thunderstorm-hail"
            break

        default: // Unknown code
            iconName = "unknown"
            break
    }

    return `${iconFolder}${iconName}.svg`
}