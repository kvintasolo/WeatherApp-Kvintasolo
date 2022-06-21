let date = new Date();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
let currentDay = days[date.getDay()];
let currentDate = date.getDate();
let currentMonth = months[date.getMonth()];
let currentYear = date.getFullYear();
let currentHours = date.getHours();
currentHour = ("0" + currentHours).slice(-2);
let currentMinutes = date.getMinutes();
currentMinute = ("0" + currentMinutes).slice(-2);
let today = document.querySelector("#date");
today.innerHTML = `${currentDay}, ${currentDate} ${currentMonth} ${currentYear}, ${currentHour}:${currentMinute}`;

function displayWeatherCondition(response) {
  console.log(response.data);

  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#todayTemp").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
  document.querySelector("#country").innerHTML = response.data.sys.country;
}

function searchCity(city) {
  let apiKey = "85ede89f59356b77be6fb516773c248a";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(displayWeatherCondition);
}
function submitCity(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchCity(city);
}

function searchLocation(position) {
  let apiKey = "85ede89f59356b77be6fb516773c248a";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayWeatherCondition);
}
function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}
let chooseCity = document.querySelector("#search-form");
chooseCity.addEventListener("submit", submitCity);
let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

searchCity("London");

function convertFahrenheit(event) {
  event.preventDefault();

  let temperatureFahrenheit = document.querySelector("#todayTemp");
  let temperature = temperatureFahrenheit.innerHTML;
  temperature = Number(temperature);
  temperatureFahrenheit.innerHTML = Math.round(temperature * (9 / 5) + 32);
}
let fahrenheitUnit = document.querySelector("#fahrenheit-link");
fahrenheitUnit.addEventListener("click", convertFahrenheit);

function convertCelsius(event) {
  event.preventDefault();
  let celsius = document.querySelector("#todayTemp");
  celsius.innerHTML = 13;
}
let celsiusUnit = document.querySelector("#celsius-link");
celsiusUnit.addEventListener("click", convertCelsius);
