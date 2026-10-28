export const headerView = () => {
    const header = document.createElement("header")
    header.className = "site-header"
    const h1 = document.createElement("h1")

    h1.textContent = "Vejret hos dig"
    const subtitle = document.createElement("p")
    subtitle.textContent = "Din lokale vejrudsigt"
    header.append(h1)
    header.append(subtitle)

    return header
}