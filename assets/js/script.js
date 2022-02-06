var previousBtn = document.getElementById("previous-search-buttons");
var currentWeatherEl = document.getElementById("current-weather");
var fiveDayEl = document.getElementById("five-day");
var currentDate = moment().format("MM/DD/YYYY");
var dayTwo = moment().add(1, 'days').format("MM/DD/YYYY");
var dayThree = moment().add(2, 'days').format("MM/DD/YYYY");
var dayFour = moment().add(3, 'days').format("MM/DD/YYYY");
var dayFive = moment().add(4, 'days').format("MM/DD/YYYY");
var daySix = moment().add(5, 'days').format("MM/DD/YYYY");
var mykey = config.MY_KEY;
var myotherkey = config.MY_OTHER_KEY;

$(document).ready(function () {
    $("#search-btn").on("click", function () {
        var city = $(this).siblings("#city-input").val();
        var apiUrl = "https://maps.googleapis.com/maps/api/geocode/json?address=" + city + "&key=" + mykey;
        apiUrl.replace(/\s/g, "_");
        console.log(city);

        fetch(apiUrl)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                console.log(data);

                if (data.status == "OK") {
                    console.log(data.status);

                    var lat = data.results[0].geometry.location.lat;
                    var lon = data.results[0].geometry.location.lng;
                    var apiWUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&units=imperial&appid=" + myotherkey;
                    var latLon = [lat, lon];

                    console.log(lat);

                    localStorage.setItem(city, latLon);

                    fetch(apiWUrl)
                        .then(function (response) {
                            return response.json();
                        })
                        .then(function (data) {
                            console.log(data);

                            var currentIcon = data.current.weather[0].icon;
                            var uvi = data.current.uvi;
                            var currentCityEl = document.getElementById("current-city");
                            var currentIconEl = document.getElementById("current-icon");
                            var currentTempEl = document.getElementById("current-temp");
                            var currentWindEl = document.getElementById("current-wind");
                            var currentHumidityEl = document.getElementById("current-humidity");
                            var uvIndexEl = document.getElementById("uv-index");
                            console.log(currentIcon);

                            currentWeatherEl.classList.remove("hidden");
                            currentCityEl.innerHTML = ("<h2>" + city + " (" + currentDate + ")</h2>");
                            currentIconEl.innerHTML = ("<img src='http://openweathermap.org/img/w/" + currentIcon + ".png' />");
                            currentTempEl.innerHTML = ("<p>Temp: " + data.current.temp + "<span>&#176;</span>F</p>");
                            currentWindEl.innerHTML = ("<p>Wind: " + data.current.wind_speed + "MPH</p>");
                            currentHumidityEl.innerHTML = ("<p>Humidity: " + data.current.humidity + "<span>&#37</span></p>");
                            uvIndexEl.innerHTML = ("<p>UV Index: <span id='uvi'>" + uvi + "</span></p>");

                            var uviColorEl = document.getElementById("uvi");
                            if (uvi <= 2) {
                                uviColorEl.classList.add("uviGood");
                                uviColorEl.classList.remove("uviModerate");
                                uviColorEl.classList.remove("uviHigh");
                                uviColorEl.classList.remove("uviVeryHigh");
                                uviColorEl.classList.remove("uviExtreme");
                            } else if (uvi >= 3 && uvi <= 5) {
                                uviColorEl.classList.remove("uviGood");
                                uviColorEl.classList.add("uviModerate");
                                uviColorEl.classList.remove("uviHigh");
                                uviColorEl.classList.remove("uviVeryHigh");
                                uviColorEl.classList.remove("uviExtreme");
                            } else if (uvi >= 6 && uvi <= 7) {
                                uviColorEl.classList.remove("uviGood");
                                uviColorEl.classList.remove("uviModerate");
                                uviColorEl.classList.add("uviHigh");
                                uviColorEl.classList.remove("uviVeryHigh");
                                uviColorEl.classList.remove("uviExtreme");
                            } else if (uvi >= 8 && uvi <= 10) {
                                uviColorEl.classList.remove("uviGood");
                                uviColorEl.classList.remove("uviModerate");
                                uviColorEl.classList.remove("uviHigh");
                                uviColorEl.classList.add("uviVeryHigh");
                                uviColorEl.classList.remove("uviExtreme");
                            } else if (uvi >= 11) {
                                uviColorEl.classList.remove("uviGood");
                                uviColorEl.classList.remove("uviModerate");
                                uviColorEl.classList.remove("uviHigh");
                                uviColorEl.classList.remove("uviVeryHigh");
                                uviColorEl.classList.add("uviExtreme");
                            }    

                            var fiveDayHeaderEl = document.getElementById("five-day-header");
                            var day2El = document.getElementById("day2");
                            var day3El = document.getElementById("day3");
                            var day4El = document.getElementById("day4");
                            var day5El = document.getElementById("day5");
                            var day6El = document.getElementById("day6");

                            fiveDayEl.classList.remove("hidden");
                            fiveDayHeaderEl.innerHTML = ("<h3>5-Day Forecast:</h3>")
                            day2El.innerHTML = ("<h4>" + dayTwo + "</h4><img src='http://openweathermap.org/img/w/" + data.daily[1].weather[0].icon + ".png' /><p>Temp: " + data.daily[1].temp.day + "<span>&#176;</span>F</p><p>Wind: " + data.daily[1].wind_speed + "MPH</p><p>Humidity: " + data.daily[1].humidity + "<span>&#37</span></p>");
                            day3El.innerHTML = ("<h4>" + dayThree + "</h4><img src='http://openweathermap.org/img/w/" + data.daily[2].weather[0].icon + ".png' /><p>Temp: " + data.daily[2].temp.day + "<span>&#176;</span>F</p><p>Wind: " + data.daily[2].wind_speed + "MPH</p><p>Humidity: " + data.daily[2].humidity + "<span>&#37</span></p>");
                            day4El.innerHTML = ("<h4>" + dayFour + "</h4><img src='http://openweathermap.org/img/w/" + data.daily[3].weather[0].icon + ".png' /><p>Temp: " + data.daily[3].temp.day + "<span>&#176;</span>F</p><p>Wind: " + data.daily[3].wind_speed + "MPH</p><p>Humidity: " + data.daily[3].humidity + "<span>&#37</span></p>");
                            day5El.innerHTML = ("<h4>" + dayFive + "</h4><img src='http://openweathermap.org/img/w/" + data.daily[4].weather[0].icon + ".png' /><p>Temp: " + data.daily[4].temp.day + "<span>&#176;</span>F</p><p>Wind: " + data.daily[4].wind_speed + "MPH</p><p>Humidity: " + data.daily[4].humidity + "<span>&#37</span></p>");
                            day6El.innerHTML = ("<h4>" + daySix + "</h4><img src='http://openweathermap.org/img/w/" + data.daily[5].weather[0].icon + ".png' /><p>Temp: " + data.daily[5].temp.day + "<span>&#176;</span>F</p><p>Wind: " + data.daily[5].wind_speed + "MPH</p><p>Humidity: " + data.daily[5].humidity + "<span>&#37</span></p>");
                        })

                } else {
                    alert("Please try again");
                }
            })
    })
})




var geocodeResults = {
    "results": [
        {
            "address_components": [
                {
                    "long_name": "Chicago",
                    "short_name": "Chicago",
                    "types": [
                        "locality",
                        "political"
                    ]
                },
                {
                    "long_name": "Cook County",
                    "short_name": "Cook County",
                    "types": [
                        "administrative_area_level_2",
                        "political"
                    ]
                },
                {
                    "long_name": "Illinois",
                    "short_name": "IL",
                    "types": [
                        "administrative_area_level_1",
                        "political"
                    ]
                },
                {
                    "long_name": "United States",
                    "short_name": "US",
                    "types": [
                        "country",
                        "political"
                    ]
                }
            ],
            "formatted_address": "Chicago, IL, USA",
            "geometry": {
                "bounds": {
                    "northeast": {
                        "lat": 42.023131,
                        "lng": -87.52366099999999
                    },
                    "southwest": {
                        "lat": 41.6443349,
                        "lng": -87.9402669
                    }
                },
                "location": {
                    "lat": 41.8781136,
                    "lng": -87.6297982
                },
                "location_type": "APPROXIMATE",
                "viewport": {
                    "northeast": {
                        "lat": 42.023131,
                        "lng": -87.52366099999999
                    },
                    "southwest": {
                        "lat": 41.6443349,
                        "lng": -87.9402669
                    }
                }
            },
            "place_id": "ChIJ7cv00DwsDogRAMDACa2m4K8",
            "types": [
                "locality",
                "political"
            ]
        }
    ],
    "status": "OK"
}