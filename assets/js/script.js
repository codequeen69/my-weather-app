cityInputEl=document.querySelector("#city-name");
var UserForm = document.querySelector(".user-form")
var lat;
var lon;
var todaysTemp;
var todaysHumidity;
var todaysUV;
var todaysWind
var todaysIcon;

var formCitySubmit = function(event){
    //prevent browser from defaut setting
    event.preventDefault();
    var cityName = cityInputEl.value.trim();
    if (cityName){
        getCityLocation(cityName);
        //then clear the input field
        cityInputEl.value = "";
    }

}

var getCityLocation = function(){
    var geoApiUrl ="http://api.openweathermap.org/geo/1.0/direct?q=" + chicago + "&limit=1&appid=701c88b75ee743df4abd89d25afbdbb1"
    fetch(geoApiUrl).then(function(response){
        if (response.ok){
            response.json().then(function(data){
                console.log(data);
            });
        }

    });
};
var getWeather = function (){
    var apiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat="+ lat+ "&lon=" + lon + "&exclude={part}&appid=701c88b75ee743df4abd89d25afbdbb1"
    fetch(apiUrl).then(function(response){

    if (response.ok){
        response.json().then(function(data){
            //console.log(data);
        });
    }
    else{
        alert("Error: data not found")
    }
});
};

var displayWeather = function(){

}


userForm.addEventListender("submit", getWeather)