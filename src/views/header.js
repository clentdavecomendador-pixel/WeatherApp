export const headerView = () => {
    const header = document.createElement("header")
    const h1 = document.createElement("h1")

    h1.textContent = "Weather Forecast"
    header.append(h1)

    return header
}