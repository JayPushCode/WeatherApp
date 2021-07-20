// WHEN I search for a city
// THEN I am presented with current and future conditions for that city and that city is added to the search history
// WHEN I view current weather conditions for that city
// THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index
// WHEN I view the UV index
// THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe
// WHEN I view future weather conditions for that city
// THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity
// WHEN I click on a city in the search history
// THEN I am again presented with current and future conditions for that city

// https://api.openweathermap.org/data/2.5/onecall?lat=35.7721&lon=-78.6386&exclude=minutely,hourly,daily&appid=023907d7951fd687a134c03414302124

// https://api.openweathermap.org/data/2.5/weather?q=raleigh&appid=023907d7951fd687a134c03414302124



// Global Parameters
const currentCity = document.getElementById("searchbox")
const submitBtn = document.getElementById("search-button")

const currentWeatherEl = document.getElementById("current-weather-icon")
const currentCityEl = document.getElementById("current_cityname")
const currentCityDate = document.getElementById("current_date")

const currentCityTemp = document.getElementById("current-temp")
const currentCityWind = document.getElementById("current-wind")
const currentCityHum = document.getElementById("current-hum")
const currentCityUV = document.getElementById("current-uv")




// Funciton to generate JSON from Search Box

submitBtn.addEventListener("click", function() {
fetch("https://api.openweathermap.org/data/2.5/weather?q=" + currentCity.value + "&appid=023907d7951fd687a134c03414302124"
)
.then((response) => response.json())
.then((response) => {
    let currentWeatherEl = response.data.weather[0].icon;
    currentWeatherEl.setAttribute("src", "https://openweathermap.org/img/wn/" + weatherPic + "@2x.png");
    currentWeatherEl.setAttribute("alt", response.data.weather[0].description);

    currentCityTemp.innerHTML = "Temperature: " + k2f(response.data.main.temp) + " &#176F";
    currentCityHum.innerHTML = "Humidity: " + response.data.main.humidity + "%";
    currentCityWind.innerHTML = "Wind Speed: " + response.data.wind.speed + " MPH";
    let lat = response.data.coord.lat;
    let lon = response.data.coord.lon;
    let UVQueryURL = "https://api.openweathermap.org/data/2.5/uvi/forecast?lat=" + lat + "&lon=" + lon + "&appid=023907d7951fd687a134c03414302124" + "&cnt=1";
    axios.get(UVQueryURL)
        .then(function(response) {
            UVIndex.innerHTML = response.data[0].value;
            currentCityUV.innerHTML = "UV Index: ";
            currentCityUV.append(UVIndex);
        });})
    });


    
//get coordinates via city name
// async function getCoordinates(cityName, apiKey) {
//     var consCoords = "https://api.openweathermap.org/data/2.5/forecast?units=imperial&q=" + cityName +
//         "&appid=" + apiKey;
//     const response = await fetch(consCoords).then(response => {
//         if (response.ok) {
//             return response.json();