function formateDateTime(date) {
	let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
	let day = days[date.getDay()];
	let hour = date.getHours();
	let minutes = date.getMinutes();

	if (minutes < 10) {
		minutes = `0${minutes}`;
	}

	if (hour < 10) {
		hour = `0${hour}`;
	}

	let formattedDate = `${day} ${hour}:${minutes}`;

	return formattedDate;
}

let now = new Date();

let currentTime = document.querySelector("#current-time");
currentTime.innerHTML = formateDateTime(now);

let citySearch = document.querySelector("#city-search");
citySearch.addEventListener("submit", search);

function showWeather(response) {
	let data = response.data;

	let cityName = data.name;
	let description = data.weather[0].description;
	let temp = Math.round(data.main.temp);
	let humidity = data.main.humidity;
	let windSpeed = data.wind.speed;

	let cityElement = document.querySelector("#city-name");
	let currentTempElement = document.querySelector("#current-temp");
	let humidityElement = document.querySelector("#humidity");
	let windSpeedElement = document.querySelector("#wind-speed");
	let descriptionElement = document.querySelector("#description");

	cityElement.innerHTML = cityName;
	currentTempElement.innerHTML = temp;
	descriptionElement.innerHTML = description;
	humidityElement.innerHTML = `Humidity: ${humidity}%`;
	windSpeedElement.innerHTML = `Wind: ${windSpeed} m/s`;
}

function search(event) {
	event.preventDefault();
	let city = document.querySelector("#city-name-input");
	city = city.value;
	let apiKey = "cee89d2ce28328a0b51ee85c0d36674d";
	let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
	axios.get(apiUrl).then(showWeather);
}

function searchCurrentLocation(position) {
	let lat = position.coords.latitude;
	let lon = position.coords.longitude;

	let apiKey = "cee89d2ce28328a0b51ee85c0d36674d";
	let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

	axios.get(apiUrl).then(showWeather);
}

function getCurrentLocation(event) {
	event.preventDefault();
	navigator.geolocation.getCurrentPosition(searchCurrentLocation);
}

let currentLocationBtn = document.querySelector("#current-location-btn");
currentLocationBtn.addEventListener("click", getCurrentLocation);

// function convertToC() {
// 	let currentTemp = document.querySelector(".currentTemp");
// 	currentTemp.innerHTML = "12";
// }

// function convertToF() {
// 	let currentTemp = document.querySelector(".currentTemp");
// 	currentTemp.innerHTML = "54";
// }

// let fahrenheit = document.querySelector("#fahrenheit");
// fahrenheit.addEventListener("click", convertToF);

// let celsius = document.querySelector("#celsius");
// celsius.addEventListener("click", convertToC);
