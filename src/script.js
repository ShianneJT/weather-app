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

function formatDay(timestamp) {
	let date = new Date(timestamp * 1000);
	let day = date.getDay();
	let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
	return days[day];
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

	cityElement.innerHTML = cityName;
	humidityElement.innerHTML = humidity;
	windSpeedElement.innerHTML = windSpeed;
	temperatureElement.innerHTML = temperature;
	descriptionElement.innerHTML = description;
	iconElement.setAttribute("src", `http://openweathermap.org/img/wn/${icon}@2x.png`);
	iconElement.setAttribute("alt", description);

	getForecast(data.coord);
}

function getForecast(coordinates) {
	let apiKey = "cee89d2ce28328a0b51ee85c0d36674d";
	let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&units=imperial&appid=${apiKey}`;
	axios.get(apiUrl).then(displayForecast);
}

function displayForecast(response) {
	let forecast = response.data.daily;
	let forecastElement = document.querySelector("#forecast");

	let forecastHTML = `<div class="row">`;
	forecast.forEach(function (forecastDay, index) {
		if (index < 5) {
			forecastHTML =
				forecastHTML +
				`
        <div class="col mr-4 ml-4">
          <div class="forecast-date">${formatDay(forecastDay.dt)}</div>
          <img src="http://openweathermap.org/img/wn/${
						forecastDay.weather[0].icon
					}@2x.png" alt="" width="50" />
          <div class="forecast-temperatures">
            <span class="forecast-temperature-max">${Math.round(forecastDay.temp.max)}°</span>
            <span class="forecast-temperature-min">${Math.round(forecastDay.temp.min)}°</span>
          </div>
        </div>    
        `;
		}
	});

	forecastHTML = forecastHTML + `</div>`;
	forecastElement.innerHTML = forecastHTML;
}

function search(city) {
	let apiKey = "cee89d2ce28328a0b51ee85c0d36674d";
	let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`;
	axios.get(apiUrl).then(showWeather);
}

function handleSubmit(event) {
	event.preventDefault();
	let city = document.querySelector("#city-name-input");
	search(city.value);
}

let citySearch = document.querySelector("#city-search");
citySearch.addEventListener("submit", handleSubmit);

search("Salt Lake City");
