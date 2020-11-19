// beginning of weather app API
$(document).ready(function() {
    var url = "api.openweathermap.org/data/2.5/weather?q=orlando,fl,us&appid=a93f43f013a881f05931ff7ec913d0ba"

    $.get(url, function(data) {
        //variables for icons, different weather patterns
        var city = data.name;
        var icon = "http://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png";
        var temp = data.main.temp;
        var feelsLike = data.main.feels_like;
        var humidity = data.main.humidity;
        var windSpeed = data.wind.speed;
        var uv = // OH GOD I DON'T KNOW HOW TO DO THIS ONE

        alert(JSON.stringify(data, null, 2));
        $(".actual").text(data.weather[0].description);
        $("body").append('<img src="' + icon + '" alt="' + data.weather[0].description + '" />')
    });
});