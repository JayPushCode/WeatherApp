// Variable Parameters

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

let history = [];
let historyContainer = document.getElementById('past-search-history')

let resetCity = function(city){currentCity.value = city; submitBtn.click();}

// Funciton to generate JSON for Current City Values from Search Box
submitBtn.onclick = function() {
     // Clears past history of Buttons
    document.getElementById('past-search-history').innerHTML = " "

    history.unshift(currentCity.value);
    // Generating Past Search Buttons 
    for (let i=0; i<history.length; i++) {
        let card = document.createElement('button');
        card.classList.add("historyBtn")
        card.textContent = history[i];
        card.setAttribute("onclick", ("resetCity('" + card.textContent +"')"))
        historyContainer.appendChild(card)
    }
    console.log(history)
    
    // Fetch Request for Current Weather Forecast
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

        let lat = data.coord.lat;
        let lon = data.coord.lon;
        let UVQueryURL = "https://api.openweathermap.org/data/2.5/uvi/forecast?lat=" + lat + "&lon=" + lon + "&appid=023907d7951fd687a134c03414302124" + "&cnt=1";

        fetch(UVQueryURL)
            .then(response => response.json())
            .then(data => {
                currentCityUV.textContent = data[0].value;
            })
        // Fetch Request for 5 Day Weather Forecast
        fetch("https://api.openweathermap.org/data/2.5/forecast?q="+currentCity.value+"&appid=023907d7951fd687a134c03414302124")
            .then(response => response.json())
            .then(data => {

                var fivedayforecast = document.getElementById("fiveday");

                // If there's already card present, clear.
                    fivedayforecast.innerHTML = " ";

                // For loop to generate cards five day forecast
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