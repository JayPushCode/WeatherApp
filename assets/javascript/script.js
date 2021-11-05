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



// Current Day Parameters

let currentCity = document.getElementById("searchbox")
let submitBtn = document.getElementById("search-button")

let currentWeatherEl = document.getElementById("current-weather-icon")
let currentCityEl = document.getElementById("current_cityname")
let currentCityDate = document.getElementById("current_date")

let currentCityTemp = document.getElementById("current-temp")
let currentCityWind = document.getElementById("current-wind")
let currentCityHum = document.getElementById("current-hum")
let currentCityUV = document.getElementById("current-uv")

let currentCityDiv = document.getElementById("current-city")

// Funciton to generate JSON for Current City Values from Search Box
submitBtn.onclick = function() {
    fetch("https://api.openweathermap.org/data/2.5/weather?q=" + currentCity.value + "&appid=023907d7951fd687a134c03414302124")
    .then(response => response.json())
    .then(data =>  {
        // Current Weather Fetch Requests ////////////////////////////////////////////////////////////////
        currentWeatherEl.src = "http://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png"
        currentCityTemp.textContent = ((((data.main.temp-273.15)*9)/5)+32).toFixed() + "° F";
        currentCityWind.textContent = data.wind.speed + " MPH";
        currentCityHum.textContent = data.main.humidity + "%";
        currentCityEl.textContent = data.name;
        currentCityDate.textContent = "   " + moment().format("dddd, MMMM Do YYYY, h:mm:ss a")
        

        console.log("First Fetch");
        console.log(data);

        let lat = data.coord.lat;
        let lon = data.coord.lon;
        let UVQueryURL = "https://api.openweathermap.org/data/2.5/uvi/forecast?lat=" + lat + "&lon=" + lon + "&appid=023907d7951fd687a134c03414302124" + "&cnt=1";

        fetch(UVQueryURL)
            .then(response => response.json())
            .then(data => {
                currentCityUV.textContent = data[0].value;
            })
        fetch("https://api.openweathermap.org/data/2.5/forecast?q="+currentCity.value+"&appid=023907d7951fd687a134c03414302124")
            .then(response => response.json())
            .then(data => {
                console.log("Second Fetch")
                console.log(data) 

                var fivedayforecast = document.getElementById("fiveday");

                // If there's already card present, clear.
                    fivedayforecast.innerHTML = " ";

                // For loop to generate cards
                    for (let i=0; i<5; i++) {
                    let container = document.createElement("div");
                    container.classList.add("forecastcard");
                    
                    // Icon
                    let icon = document.createElement('img')
                    icon.src = "http://openweathermap.org/img/wn/" + data.list[i].weather[0].icon + "@2x.png"
                    container.appendChild(icon);

                    // Temperature 
                    let temp = document.createElement('div');
                    temp.classList.add("current-details");
                    temp.textContent = "Temp: " + ((((data.list[i].main.temp-273.15)*9)/5)+32).toFixed() + "° F";
                    container.appendChild(temp);

                    // Wind Speed
                    let wind = document.createElement('div');
                    wind.classList.add("current-details");
                    wind.textContent = "Wind: " + data.list[i].wind.speed + " MPH";
                    container.appendChild(wind);

                    // Humidity
                    let hum = document.createElement('div');
                    hum.classList.add("current-details");
                    hum.textContent = "Humidity: " + data.list[i].main.humidity + " %";
                    container.appendChild(hum);

                    fivedayforecast.appendChild(container)
                    }
                
            })
    })}
    
    
    ;
