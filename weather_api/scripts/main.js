"use strict";

//declare a const to access the form
const cityForm = document.querySelector("#cityForm");
//declare a const to access the weather div
const weatherDiv = document.querySelector("#weatherContainer");
const weatherDataList = document.createElement("ul");

//when submit is clicked do something
cityForm.addEventListener("submit",function(event){
    //event.preventDefault();
    const cityInput = cityForm.querySelector("input").value;
    console.log("Form has been submitted!",cityInput);
})

function addLocationName(name){
    const locationName = document.createElement("li");
    locationName.innerHTML = (`Location: ${name}`);
    console.log(locationName.innerHTML);
    weatherDataList.append(locationName);
}

function addTemp(temp){
    console.log("Temperature is ", temp);
    const tempDisplay = document.createElement("li");
    tempDisplay.innerHTML = (`Current Temperature: ${temp}`);
    weatherDataList.append(tempDisplay);
}

function addWind(wind){
    console.log("Wind Speed is ", wind);
    const windDisplay = document.createElement("li");
    windDisplay.innerHTML = (`Current Wind Speed: ${wind}`);
    weatherDataList.append(windDisplay);
}

function addWeatherIcon(icon){
    console.log("Icon code is ", icon);
    const iconCode = document.createElement("li");
    const iconUrl = (`http://openweathermap.org/img/w/${icon}.png`);
    const iconDisplay = document.createElement("img")
    iconDisplay.src = iconUrl
    iconDisplay.atl = "This is an icon for the current weather condition"
    weatherDataList.append(iconDisplay);
}

function addSunInfo(sunrise, sunset) {
    console.log("sunrise is: ", sunrise);
    console.log("sunset is: ", sunset);
}

function addMap(lat, lon){
    console.log(`Lat is: ${lat}, Long is: ${lon}`);
    const mapUrl = (`http://maps.google.com/maps?q=${lat},${lon}&output=embed`);
    console.log(mapUrl);
    const mapDisplay = document.createElement("iframe");
    mapDisplay.src = mapUrl;
    weatherDiv.append(mapDisplay);
}

//create a function to update weather data returned
function updateWeatherData(city) {
    
    get(`https://api.openweathermap.org/data/2.5/weather?q=${city},US&units=imperial&appid=2f4580c1da2a1471787ee4c356181fd1`)
    .then(response => {
        console.log("response is ", response);
        addLocationName(response.name);
        addTemp(response.main.temp);
        addWind(response.wind.speed);
        addWeatherIcon(response.weather[0].icon);
        weatherDiv.append(weatherDataList);
        addMap(response.coord.lat, response.coord.lon);
        addSunInfo(response.sys.sunrise,response.sys.sunrise);
    }
        );

}


updateWeatherData("Atlanta");
