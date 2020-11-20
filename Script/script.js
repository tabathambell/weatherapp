$(document).ready(function() {
    var citiesList = "";
    if (localStorage.getItem("citiesList") !== null) {
        citiesList = localStorage.getItem("citiesList");
        makeCityButtons(citiesList);
    }

    $("#weatherButton .city").click(function() {
        var cityName = "";
        if ($(this).hasClass("city")) {
            cityName = $(this).val();
        } else {
            cityName = $("input.form control").val();
        }

        var cityName = $("input.form-control").val();
        var url = "http://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=737d27db0b50c8b167d4a3cda67efcfe";
    
        // Gets the current weather data.
        $.get(url, function(data) {
            if (citiesList == "") {
                citiesList += cityName;
            } else {
                citiesList += "," + cityName;
            }

            localStorage.setItem("citiesList", citiesList);
            $(".history").append("<button class='city'>" + cityName + "</button>")

            var icon = "http://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png";
            var temp = plzNotKelvin(data.main.temp);
            var feelsLike = plzNotKelvin(data.main.feels_like);
            var humidity = data.main.humidity;
            var windSpeed = mphWind(data.wind.speed);
            var lat = data.coord.lat;
            var lon = data.coord.lon;

            var uvUrl = "http://api.openweathermap.org/data/2.5/uvi?lat=" + lat + "&lon=" + lon + "&appid=737d27db0b50c8b167d4a3cda67efcfe";
            var foreUrl = "http://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=current,minutely,hourly,alerts&appid=737d27db0b50c8b167d4a3cda67efcfe";

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
            $("img.current").attr("src", icon);
            $("h1.current").text(temp + "F");
            $("p.current").html("Feels Like: " + feelsLike + " F<br />Humidity: " + humidity + "%<br />" + "Wind Speed: " + windSpeed + "mph");

            // Gets the forecast weather data.
            $.get(foreUrl, function(data) {
                
                for (var i = 0; i < 5; i++) {
                    var icon = "http://openweathermap.org/img/wn/" + data.daily[i].weather.icon + "@2x.png";
                    var date = moment.unix(data.daily[i].dt).format("MMMM Do");
                    var temp = plzNotKelvin(data.daily[i].temp.day);
                    var humidity = data.daily[i].humidity;
                    var windSpeed = mphWind(data.daily[i].wind_speed);

                    // TODO: Place the weather information into appropriate HTML elements.
                    var forecastNum = i + 1;
                    $("h1.forecast" + forecastNum).text(date);
                    $("p.forecast" + forecastNum).html("Temperature: " + temp + " F<br />Humidity: " + humidity + "%<br />" + "Wind Speed: " + windSpeed + "mph");
                }
            });

        });
        
    });
});

// Function to convert degrees Kelvin into degrees Fahrenheit.
function plzNotKelvin(degreesK) {
    return Math.round((degreesK - 273.15) * 9/5 + 32);
}

// Function to convert wind speed from meters per second into miles per hour.
function mphWind(windSpeedMS) {
    return Math.round(windSpeedMS * 2.237);
}

function makeCityButtons(list) {
    var listArray = list.split(",");
        for (i = 0; i < listArray.length; i++) {
            $(".history").append("<button class='city'>" + listArray[i] + "</button>")
        }
}