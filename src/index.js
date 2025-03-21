function handleSearch(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input");
  // let cityElement = document.querySelector("#city");
  // cityElement.innerHTML =  searchInput.value;

  searchCity(searchInput.value);
}

function handleTemperature(response) {

  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(response.data.temperature.current);

  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = response.data.city;

  let conditionElement = document.querySelector("#condition");
  conditionElement.innerHTML = response.data.condition.description;

  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;

  let windElement = document.querySelector("#wind");
  windElement.innerHTML = `${response.data.wind.speed}km/h`;

  let timeElement = document.querySelector("#time");
  let date = new Date(response.data.time * 1000);

  timeElement.innerHTML = formatDate(date);

  let iconElement = document.querySelector("#icon");
  iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class = "icon-image" />`;


  seachForcast(response.data.city);

}

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = days[date.getDay()];

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  if (hours < 10) {
    hours = `0${hours}`;
  }

  return `${day} ${hours}:${minutes}`;
}

function searchCity(city) {
  let apiKey = "8703ffd45fec607afo9ae4ed13140bt8";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

  axios.get(apiUrl).then(handleTemperature);
}

let searchForm = document.querySelector("#search");
searchForm.addEventListener("submit", handleSearch);

searchCity("Paris");


function formatDay(timestamp){
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thurs", "Fri", "Sat",];

  return days[date.getDay()]
}


function handleForecast(response) {

  console.log(response.data)
  // let days = ["Tue", "Wed", "Thurs", "Fri", "Sat",]
  let forecastHTML = ""

  response.data.daily.forEach(function (day, index) {

     if (index < 5){
     
    forecastHTML = forecastHTML + `<div class="weather-day">
          <div class="weather-date">${formatDay(day.time)}</div>
          <img class="weather-image" src="${day.condition.icon_url}" />
          <div class="temperatures">
            <div class="temperature-unit"><strong>${Math.round(day.temperature.maximum)}&deg;</strong></div>
            <div class="temperature-unit">${Math.round(day.temperature.minimum)}&deg;</div>
          </div>
        </div>`;
        }
  })

  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHTML;
}



function seachForcast(city) {
  let apiKey = "8703ffd45fec607afo9ae4ed13140bt8";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;

  axios.get(apiUrl).then(handleForecast);
}