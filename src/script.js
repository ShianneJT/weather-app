function formatDateTime(date) {
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

let currentTime = document.querySelector("#date");
currentTime.innerHTML = formatDateTime(now);

function showWeather(response) {
	let cityElement = document.querySelector("#city");
	let humidityElement = document.querySelector("#humidity");
	let windSpeedElement = document.querySelector("#wind");
	let temperatureElement = document.querySelector("#temperature");
	let descriptionElement = document.querySelector("#description");
	let iconElement = document.querySelector("#icon");

	let data = response.data;

	let cityName = data.name;
	let humidity = data.main.humidity;
	let windSpeed = data.wind.speed;
	let temperature = Math.round(data.main.temp);
	let description = data.weather[0].description;
	let icon = data.weather[0].icon;

	celsiusTemp = temperature;

	cityElement.innerHTML = cityName;
	humidityElement.innerHTML = humidity;
	windSpeedElement.innerHTML = windSpeed;
	temperatureElement.innerHTML = temperature;
	descriptionElement.innerHTML = description;
	iconElement.setAttribute("src", `http://openweathermap.org/img/wn/${icon}@2x.png`);
	iconElement.setAttribute("alt", description);
}

function search(city) {
	let apiKey = "cee89d2ce28328a0b51ee85c0d36674d";
	let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
	axios.get(apiUrl).then(showWeather);
}

function handleSubmit(event) {
	event.preventDefault();
	let city = document.querySelector("#city-name-input");
	search(city.value);
}

function displayFahrenheit(event) {
	event.preventDefault();
	fahrenheitLink.classList.add("active");
	celsiusLink.classList.remove("active");
	let temperatureElement = document.querySelector("#temperature");
	let fahrenheitTemp = (celsiusTemp * 9) / 5 + 32;
	temperatureElement.innerHTML = Math.round(fahrenheitTemp);
}

function displayCelsius(event) {
	event.preventDefault();
	celsiusLink.classList.add("active");
	fahrenheitLink.classList.remove("active");
	let temperatureElement = document.querySelector("#temperature");
	temperatureElement.innerHTML = celsiusTemp;
}

let celsiusTemp = null;

let citySearch = document.querySelector("#city-search");
citySearch.addEventListener("submit", handleSubmit);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheit);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsius);

search("San Fransisco");

// function searchCurrentLocation(position) {
// 	let lat = position.coords.latitude;
// 	let lon = position.coords.longitude;

// 	let apiKey = "cee89d2ce28328a0b51ee85c0d36674d";
// 	let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

// 	axios.get(apiUrl).then(showWeather);
// }

// function getCurrentLocation(event) {
// 	event.preventDefault();
// 	navigator.geolocation.getCurrentPosition(searchCurrentLocation);
// }

// let currentLocationBtn = document.querySelector("#current-location-btn");
// currentLocationBtn.addEventListener("click", getCurrentLocation);
