document.addEventListener("DOMContentLoaded", defaultCity());

let isNow = new Date();

// ======================================== NOW IS DATE =============
let currentWeekDay = isNow.getDay();
let weekDays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let currentDay = isNow.getDate();
let currentMonth = isNow.getMonth();
let monthes = [
  "January",
  "Fabruary",
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

let nowIs = document.querySelector("#current-day");
nowIs.innerHTML = `${weekDays[currentWeekDay]}, ${currentDay} ${monthes[currentMonth]}`;

// ======================================== NOW IS TIME =============
let currentHour = isNow.getHours();
let currentMinute = isNow.getMinutes();
let currentHourUpg = currentHour;
let currentMinuteUpg = currentMinute;

if (currentHour < 10) {
  currentHourUpg = "0" + `${currentHour}`;
}

if (currentMinute < 10) {
  currentMinuteUpg = "0" + `${currentMinute}`;
}

let nowIsTime = document.querySelector("#current-time");
nowIsTime.innerHTML = `${currentHourUpg}:${currentMinuteUpg}`;

// ======================================== SEARCH CITY ENGINE =============

function defaultCity() {
  let localLatitude = 50.4333;
  let localLongitude = 30.5167;

  let apiKey = "062a09b2ac32c51fd9e8b024e2f69734";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${localLatitude}&lon=${localLongitude}&units=metric&appid=${apiKey}`;

  axios.get(`${apiUrl}&appid=${apiKey}`).then(getTemp);
  axios.get(`${apiUrl}&appid=${apiKey}`).then(getCity);
}

function getTemp(response) {
  let temp = Math.round(response.data.main.temp);

  let tempCF = document.querySelector("#temp-cf");
  tempCF.innerHTML = temp;
}

function getCity(response) {
  let city = document.querySelector("#old-city");
  let newCity = response.data.name;

  city.innerHTML = `${newCity}`;
}

function positionByCity() {
  event.preventDefault();

  let city = document.querySelector("#old-city");
  let newCity = document.querySelector("#in-city-input");

  let apiKey = "062a09b2ac32c51fd9e8b024e2f69734";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${newCity.value}&units=metric`;

  axios.get(`${apiUrl}&appid=${apiKey}`).then(getTemp);
  axios.get(`${apiUrl}&appid=${apiKey}`).then(getCity);

  // city.innerHTML = newCity.value;
  return (newCity.value = "");
}

function positionByCoord(position) {
  let localLatitude = position.coords.latitude;
  let localLongitude = position.coords.longitude;

  let apiKey = "062a09b2ac32c51fd9e8b024e2f69734";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${localLatitude}&lon=${localLongitude}&units=metric&appid=${apiKey}`;

  axios.get(`${apiUrl}&appid=${apiKey}`).then(getTemp);
  axios.get(`${apiUrl}&appid=${apiKey}`).then(getCity);
}

function getCurrentPosition() {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(positionByCoord);
}

let searchCity = document.querySelector(".in-city");
searchCity.addEventListener("submit", positionByCity);

let current = document.querySelector("#current-button");
current.addEventListener("click", getCurrentPosition);

// ======================================== SHANGE C/F =============

// function changeTempF(event) {
//   event.preventDefault();

//   let tempCF = document.querySelector("#temp-cf");
//   tempCF.innerHTML = `66`;

//   // tempF = calc((tempCF * 9) / 5 + 32);
//   // console.log(tempF);
//   // tempCF.innerHTML = `${tempF}`;
// }

// function changeTempC(event) {
//   event.preventDefault();

//   let tempCF = document.querySelector("#temp-cf");
//   tempCF.innerHTML = `19`;
// }

// let tempCF = document.querySelector("#temp-cf");
// let tempF = document.querySelector("#temp-f");
// tempF.addEventListener("click", changeTempF);

// let tempC = document.querySelector("#temp-c");
// tempC.addEventListener("click", changeTempC);

// ======================================== CURRENT CUTY & TEMP =============
