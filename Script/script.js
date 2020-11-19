/*

DONE: Current weather data.
DONE: Get UV data (new API call).
TODO: Get forecast data (new API call).
TODO: Organize HTML elements.
TODO: City search
TODO: Search history
TODO: UV colors.

*/

$(document).ready(function() {
    // TODO: Add a search bar in the HTML and use it for the q= parameters in the API endpoint URLs for the city name.
    // TODO: Wrap all this in a button click event.
    // TODO: On button click, add to search history.
    var url = "http://api.openweathermap.org/data/2.5/weather?q=edmonton&appid=737d27db0b50c8b167d4a3cda67efcfe";
    var foreUrl = "http://api.openweathermap.org/data/2.5/forecast/daily?q=edmonton&cnt=5&appid=737d27db0b50c8b167d4a3cda67efcfe";
    
    // Gets the current weather data.
    $.get(url, function(data) {
        var city = data.name;
        var icon = "http://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png";
        var temp = plzNotKelvin(data.main.temp);
        var feelsLike = plzNotKelvin(data.main.feels_like);
        var humidity = data.main.humidity;
        var windSpeed = mphWind(data.wind.speed);
        var lat = data.coord.lat;
        var lon = data.coord.lon;

        var uvUrl = "http://api.openweathermap.org/data/2.5/uvi?lat=" + lat + "&lon=" + lon + "&appid=737d27db0b50c8b167d4a3cda67efcfe";

        // Gets the UV Index.
        $.get(uvUrl, function(data) {
            var uvi = data.value;
            $(".actual").text(uvi);
            if (uvi < 3) {
                $(".actual").css("color","green");
            } else if (uvi < 6) {
                $(".actual").css("color","yellow");
            } else if (uvi < 8) {
                $(".actual").css("color","orange");
            } else if (uvi < 11) {
                $(".actual").css("color","red");
            } else {
                $(".actual").css("color","purple");
            }
        });

        // TODO: Place the weather information into appropriate HTML elements.
        $("body").append('<img src="' + icon + '" alt="' + data.weather[0].description + '" />')
    });

    // Gets the forecast weather data.
    $.get(foreUrl, function(data) {
        for (var i = 0; i < data.list.length; i++) {
            var icon = "http://openweathermap.org/img/wn/" + data.list[i].weather.icon + "@2x.png";
            var date = moment.unix(data.list[i].dt).format("MMMM Do, YYYY");
            var dayTemp = plzNotKelvin(data.list[i].temp.day);
            var nightTemp = plzNotKelvin(data.list[i].temp.night);
            var humidity = data.list[i].humidity;
            var windSpeed = mphWind(data.list[i].speed);

            // TODO: Place the weather information into appropriate HTML elements.
        }
    });
});

// Function to convert degrees Kelvin into degrees Fahrenheit.
function plzNotKelvin(degreesK) {
    return (degreesK - 273.15) * 9/5 + 32;
}

// Function to convert wind speed from meters per second into miles per hour.
function mphWind(windSpeedMS) {
    return windSpeedMS * 2.237;
}