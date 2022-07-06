var cityInputEl = document.querySelector("#city-name");
var fiveDayEl = document.querySelector (".five-day");
var fiveDayTwoEl = document.querySelector(".five-day-two")
var userFormEl = document.querySelector(".user-form")
var currentCity = document.querySelector(".current-city")
var cityHistory = document.querySelector(".city-history");
var lat;
var lon;
var currentTemp;
var currentHumidity;
var currentUv;
var currentWind
var currentIcon;
var currentDate = moment().date();
var fiveDayForecast;

var formCitySubmit = function (event) {
    //prevent browser from defaut setting
    event.preventDefault();
    //get value from inpput element
    var cityName = cityInputEl.value.trim();
    if (cityName) {
        currentCity.innerHTML="";
        getCityLocation(cityName);
        saved();
        //then clear the input field
        cityInputEl.value = "";
    }
    else{
        alert("Please enter a city name.")
    }
};

var getWeather = function (newLon, newLat, city) {
    console.log(newLat);
    var apiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + newLat + "&lon=" + newLon + "&units=imperial&appid=701c88b75ee743df4abd89d25afbdbb1";
    fetch(apiUrl).then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
                displayCurrentWeather(data, city);
                //display 5 day
                displayFiveDay(data, city);
                
            });
        }
        else {
            alert("Error: City not found")
        }
    });
};
var getCityLocation = function (city) {
    var geoApiUrl = "https://api.openweathermap.org/geo/1.0/direct?q=" + city + "&limit=1&appid=701c88b75ee743df4abd89d25afbdbb1"
    fetch(geoApiUrl).then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {

                var newLat = data[0].lat;
                var newLon = data[0].lon;
                getWeather(newLon, newLat, city);
                
            });
        }

    });
};

var displayCurrentWeather = function (data, city) {
    //name
    var currentCityName = document.createElement("h3");
    currentCityName.textContent = city;
    currentCity.appendChild(currentCityName);
    //date
    var thisDate =moment().format("MMMM Do YYYY");
    var currentDate = document.createElement("p");
    currentDate.textContent = thisDate;
    currentCity.appendChild(currentDate);
    //icon
    var currentIcon = data.current.weather[0].icon;
    var currentCityIcon = document.createElement("img");
    currentCityIcon.setAttribute("src", "https://openweathermap.org/img/wn/" + currentIcon + "@2x.png");
    currentCity.appendChild(currentCityIcon);
    //Temp
    var currentTemp = data.current.temp;
    var currentCityTemp = document.createElement("p");
    currentCityTemp.textContent = "Temperature: " + currentTemp + " °F";
    currentCity.appendChild(currentCityTemp);

    //humidity
    var currentHumidity = data.current.humidity;
    var currentCityHumidity = document.createElement("p");
    currentCityHumidity.textContent = "Humidity: " + currentHumidity + " %";
    currentCity.appendChild(currentCityHumidity);

    //wind
    var currentWind = data.current.wind_speed;
    var currentCityWind = document.createElement("p");
    currentCityWind.textContent = "Wind: " + currentWind + " MPH";
    currentCity.appendChild(currentCityWind);

    //UV
    var currentUv = data.current.uvi;
    var currentCityUv = document.createElement("p");
    currentCityUv.textContent = "UVI: " + currentUv;
    currentCity.appendChild(currentCityUv);
    if (currentUv <= 2){
        currentCityUv.classList.add("safe");
    }
    if(currentUv >=3 <6){
    currentCityUv.classList.add("mild");
    }
    if(currentUv>=6 <8){
        currentCityUv.classList.add("moderate");
    }
    if (currentUv > 8){
        currentCityUv.classList.add("severe");
    }

};

displayFiveDay = function(data){
    fiveDayEl.textContent = "";
    
    for (var i =1; i<6; i++){
        var parentDiv = document.createElement("div");
        parentDiv.classList.add("parent-el")
       // date
        var dateDaily = document.createElement("p")
        var dailyDate =moment.unix(data.daily[i].dt).format("MMMM Do YYYY");
        dateDaily.textContent = dailyDate;
       parentDiv.appendChild(dateDaily);
    
        //cute icon
        var iconDaily = document.createElement("img")
        var dailyIcon = data.daily[i].weather[0].icon;
        iconDaily.setAttribute("src", "https://openweathermap.org/img/wn/" + dailyIcon + "@2x.png");
        parentDiv.appendChild(iconDaily);

        //Temp
        var tempDaily = document.createElement("p");
        var dailyTemp = data.daily[i].temp.day;
        tempDaily.textContent = "Temp: " + dailyTemp + " °F";
        parentDiv.appendChild(tempDaily);

        //Humidity
        var humidityDaily = document.createElement("p");
        var dailyHumidity = data.daily[i].humidity;
        humidityDaily.textContent = "Humidity: " + dailyHumidity + " %";
        parentDiv.appendChild(humidityDaily);

        //Wind
        var windDaily = document.createElement("p");
        var dailyWind = data.daily[i].wind_speed;
        windDaily.textContent = "Wind: " + dailyWind + " MPH";
        parentDiv.appendChild(windDaily);
        
        fiveDayEl.appendChild(parentDiv);
    }

};
var saved = function(){
    var saveCity = document.querySelector("#city-name").value;
    //console.log(saveCity);
    if (localStorage.getItem('city')==null){
        localStorage.setItem('city', '[]');
    }
    var oldCity = JSON.parse(localStorage.getItem('city'));
    oldCity.push(saveCity);
    localStorage.setItem('city', JSON.stringify(oldCity));
    var saveButton = document.createElement("button");
    saveButton.classList.add("save-btn");
    saveButton.textContent = saveCity
    cityHistory.appendChild(saveButton);
    saveButton.onclick = clickButton
};

function clickButton(event){
    event.preventDefault;
    var cityClicked = event.target
    currentCity.textContent = "";
    getCityLocation(cityClicked.textContent)
}
userFormEl.addEventListener("submit", formCitySubmit);