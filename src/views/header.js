export const headerView = () => {
    const header = document.createElement("header")
    const h1 = document.createElement("h1")

    h1.textContent = "Vejrudsigt"
    header.append(h1)

    return header
}