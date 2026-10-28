export function todaysWeather(myData, myParentData, myDate) {
    // This allow me to display a date
    // Which is why it's empty
    let displayDate = ""

    console.log(myData)
    // If given a date then it will be in displayDate
    if(myDate) {
        displayDate = myDate
    } else {
        // If not given a date use today's date to be displayed
        let currentDate = new Date();
        let year = currentDate.getFullYear();
        // The code will always be in string. Because the code start the month at 0, + 1 allows it to match with our month the padStart(2, '0') make it so it display in 2 digits
        let month = String(currentDate.getMonth() + 1).padStart(2, '0');
        let day = String(currentDate.getDate()).padStart(2, '0')
        displayDate = `${year}-${month}-${day}`;
    }

    console.log(displayDate)

    let today = myData.find(dayData => dayData.date === displayDate);

    if (!today) {
        console.error("No data found for", displayDate);
        return;
    }

    console.log(today)

    let todaysCard = document.createElement("section")

    let todaysWeatherIcon = document.createElement(today.weather_code)

    todaysCard.innerHTML`<img src = "${todaysWeatherIcon}">
        <h2>${today.temp_max}</h2> <h4>${today.temp_min}</h4>
    `

    myParentData.innerHTML = ""
    myParentData.append(todaysCard)

    /*apparent_temp_max
: 
10.6
apparent_temp_min
: 
6
date
: 
"2026-10-23"
precipitation_probability_max
: 
86
precipitation_sum
: 
0.8
temp_max
: 
12.3
temp_min
: 
7.8
weather_code
: 
51
wind_direction
: 
150
wind_gusts_max
: 
11.6
wind_speed_max
: 
6.4*/
}