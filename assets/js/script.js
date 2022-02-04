var previousBtn = document.getElementById("previous-search-buttons");
var currentWeatherEl = document.getElementById("current-weather");
var fiveDayEl = document.getElementById("five-day");
var mykey = config.MY_KEY;
var myotherkey = config.MY_OTHER_KEY;

$(document).ready(function() {
    $("#search-btn").on("click", function() {
        var city = $(this).siblings("#city-input").val();
        var apiUrl = "https://maps.googleapis.com/maps/api/geocode/json?address=" + city + "&key=" + mykey;
        apiUrl.replace(/\s/g, "_");
        console.log(city);

        fetch(apiUrl)
        .then(function(response) {
             console.log(response);
        })
        .catch(err => {
            console.log(err);
        });

        localStorage.setItem("city", city);
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