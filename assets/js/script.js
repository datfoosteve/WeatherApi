// api key = a5e46464981ac81b02746fd8f6f37e05
// https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}
//  lat long = 32.774362851195406, -96.5876231568268
// fetch('https://api.openweathermap.org/data/2.5/onecall?lat=32.774362851195406&lon=-96.5876231568268&exclude={part}&appid=a5e46464981ac81b02746fd8f6f37e05', {
//   method: 'GET', //GET is the default.
"use strict";

let cityName = {
  textContent: "",
};

const ONE_CALL = "a5e46464981ac81b02746fd8f6f37e05";
const FIVE_DAY = "cc473042953f16aa3bd5293b1ce6f316";

const cardColEl = document.querySelector(".MainFiveCardClassColumns");

let url =
  "https://api.openweathermap.org/data/2.5/weather?q=${q}&appid=${FIVE_DAY}";

// The API that openWeatherMap gives that allows geolocation, only using this API for that purpose.
// Async allows us to use AWAIT
const geoLocation = async (city) => {
  const geoUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${ONE_CALL}`;
  const response = await fetch(geoUrl);
  const data = await response.json();
  // These 2 lines allocates the lat and lon to our data variable
  const lat = data[0].lat;
  const lon = data[0].lon;
  console.log(data);
  getWeatherData(lat, lon, city);
};

//
const getWeatherData = async (lat, lon, city) => {
  const weatherDataURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${ONE_CALL}&units=imperial`;
  const response = await fetch(weatherDataURL);
  const data = await response.json();
  console.log(data);
  displayWeatherData(data, city);
};

const displayWeatherData = (weatherInfo, city) => {
  const currentWeather = weatherInfo.current.weather[0].description;
  const currentWeatherEl = document.querySelector(".currWeather");
  currentWeatherEl.textContent = currentWeather;

  const currentTemp = weatherInfo.current.temp;
  const currentTempEl = document.querySelector(".currTemperature");
  currentTempEl.textContent = currentTemp;

  const feelzLike = weatherInfo.current.feels_like;
  const feelzLikeEl = document.querySelector(".feelzWeather");
  feelzLikeEl.textContent = feelzLike;

  const currentHumidity = weatherInfo.current.humidity;
  const currentHumidityEl = document.querySelector(".currHumidity");
  currentHumidityEl.textContent = currentHumidity;

  const currentWindspeed = weatherInfo.current.wind_speed;
  const currentWindspeedEl = document.querySelector(".currWindSpeed");
  currentWindspeedEl.textContent = currentWindspeed;

  const weatherIcon = weatherInfo.current.weather[0].icon;
  const weatherIconURL = `https://openweathermap.org/img/wn/${weatherIcon}@2x.png`;
  const daycurrIconEl = document.querySelector("#currDayIcon");
  daycurrIconEl.src = weatherIconURL;
  const cardTitle = document.querySelector(".cardTitle");
  console.log(city);
  cardTitle.textContent = "Currently in " + city;

  displayFiveDay(weatherInfo);
};

const displayFiveDay = (weatherInfo) => {
  const htmlDate = (i) => {
    var timestamp = weatherInfo.daily[i].dt;
    var date = new Date(timestamp * 1000);
    var days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    return (
      days[date.getDay()] +
      "</br>" +
      (date.getMonth() + 1) +
      "/" +
      date.getDate() +
      "/" +
      date.getFullYear()
    );
  };

  for (let i = 1; i < 6; i++) {
    const cardElement = `<div class="animate glow blur delay-${+i}">
<div class="FiveCardRow">
    <div class="CardClass">
      <h1 class="cardHeader">
            ${htmlDate(i)}
      </h1>
        <h2 class="CardBody">
            <h3 class="CardPicture">
            <img
            src="http://openweathermap.org/img/wn/${
              weatherInfo.daily[i].weather[0].icon
            }@2x.png"
            width="150"
            alt="WeatherIcon"
            class="image"
            id="currDayIcon"
          />
            </h3>
            <h4 class="CardInfo">

                <p>
                    Temperature:
                    <span class="Temperature">  
                    ${weatherInfo.daily[i].temp.day}
                    </span>
                </p>

                <p>
                    Humidity:
                    <span class="Humidity"> 
                    ${weatherInfo.daily[i].humidity}</span>
                </p>

                <p>
                    Windspeed:
                    <span class="WindSpeed">
                     ${weatherInfo.daily[i].wind_speed}</span>
                </p>
                
            </h4>
        </h2>
    </div>
    <!-- // CardClass-->
</div>
<!-- // FiveCardRow-->
</div>`;
    const newEl = document.createElement("div");
    newEl.innerHTML = cardElement;
    cardColEl.append(newEl);
  }
};

const request = async (url) => {
  const response = await fetch(url);
  return response.ok
    ? response.json()
    : Promise.reject({
        error: 500,
      });
};

const getWeatherInfo = async (element, form) => {
  try {
    const q = form.querySelector("#q").value;
    let myJSON = await request(url);
    getWeatherInfo.innerText = JSON.stringify(myJSON);
    console.log(JSON.stringify(myJSON));
    // This .json() parses the response as a JSON
  } catch (err) {
    console.log(err);
  }
};

const url2 =
  "https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid=cc473042953f16aa3bd5293b1ce6f316";

const request2 = async (url2) => {
  const response2 = await fetch(url2);
  return response2.ok ? response2.json() : Promise.reject({ error: 500 });
};

const form = document.querySelector("#form");

form.addEventListener(
  "submit",
  (e) => {
    e.preventDefault();
    let citySearch = document.querySelector("#q").value;
    geoLocation(citySearch);

    //getWeatherInfo2(document.querySelector('#results'),form);
  },
  false
);

//   const getWeatherInfo2 = async (element, form) => {
//     try { const q = form.querySelector('#q').value;
//   let myJSON2 = await
//   request2(url2);
//   element.innerText = JSON.stringify(myJSON2);
//   // This .json() parses the response as a JSON

//   } catch(err){
//     console.log(err);
//   }
//   };

//   };
