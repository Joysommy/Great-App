let current = new Date();

let h2 = document.querySelector("h2");
let date = current.getDate();
let hours = current.getHours();
let minutes = current.getMinutes();
let year = current.getFullYear();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];
let day = days[current.getDay()];

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

let month = months[current.getMonth()];

h2.innerHTML = `${day} ${month} ${date}, ${hours}: ${minutes}, ${year}`;

function find(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input");

  if (searchInput.value) {
    searchCity(searchInput.value);
  } else {
    alert("Please type a city");
  }
}
let form = document.querySelector("#request-form");
form.addEventListener("submit", find);

//challenge 2
function searchCity(city) {
  let apiKey = "75682493619b783a70bb68caa28efb07";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showTemperature);
}

function showTemperature(response) {
  let h1 = document.querySelector("h1");
  h1.innerHTML = response.data.name;
  let current = document.querySelector("#current");
  current.innerHTML = `${Math.round(response.data.main.temp)}°C`;
  let description = document.querySelector("#description");
  description.innerHTML = response.data.weather[0].description;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
}

let temp = document.querySelector("#request-form");
temp.addEventListener("submit", showTemperature);

//get location
function currentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(knowPosition);
}
function knowPosition(response) {
  let lat = response.coords.latitude;
  let lon = response.coords.longitude;
}
let buttonCurrent = document.querySelector("#current-button");
buttonCurrent.addEventListener("click", currentPosition);
