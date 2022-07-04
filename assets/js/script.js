cityInputEl=document.querySelector("#city-name");
var userFormEl = document.querySelector(".user-form")
var currentCity = document.querySelector(".current-city")
var lat;
var lon;
var currentTemp;
var currentHumidity;
var currentUv;
var currentWind
var currentIcon;
var currentDate = moment().date();
var fiveDayForecast;

var formCitySubmit = function(event){
    //prevent browser from defaut setting
    event.preventDefault();
    //get value from inpput element
    var cityName = cityInputEl.value.trim();
    if (cityName){
        getCityLocation(cityName);
        //then clear the input field
        cityInputEl.value = "";
    }
    else{
        alert("Please enter a city name.")
    }
};

var getWeather = function (newLat, newLon){
    var apiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + newLat + "&lon=" + newLon + "&units=imperial&appid=701c88b75ee743df4abd89d25afbdbb1";
    fetch(apiUrl).then(function(response){
     if (response.ok){
        response.json().then(function(data){
            //console.log(data);
           if(data.current.temp){
                currentTemp = data.current.temp;
                //console.log(currentTemp)
           }
            if(data.current.humidity){
           currentHumidity = data.current.humidity;
           //console.log(currentHumidity);
            }
            if(data.current.wind_speed){
                currentWind =  data.current.wind_speed;
                //console.log(currentWind);
            }
            if(data.current.uvi){
                currentUv = data.current.uvi;
                console.log(currentUv);
            }
            if(data.daily){
            fiveDayForecast = data.daily;
            //console.log(data.daily);
            }
           
         });
     }
    else{
         alert("Error: data not found")
     }
});
};
var getCityLocation = function(city){
    var geoApiUrl ="http://api.openweathermap.org/geo/1.0/direct?q=" + city + "&limit=1&appid=701c88b75ee743df4abd89d25afbdbb1"
    fetch(geoApiUrl).then(function(response){
         if (response.ok){
            response.json().then(function(data){
                //console.log(data);

                var newLat = data[0].lat;
                var newLon = data[0].lon;
                getWeather(newLon, newLat);
            });
     }
     
    });
};

var displayCurrentWeather = function(){
    var currentCityTemp = document.createElement("p");
    currentCityTemp.textcontent = "Temperature" + currentTemp
    currentCity.appendChild(currentCityTemp);
}
userFormEl.addEventListener("submit", formCitySubmit);