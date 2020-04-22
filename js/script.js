const api = {
    key: "6f1aa5a06770929433faa4911e4334a1",
    baseurl: "https://api.openweathermap.org/data/2.5/"
}

const searchbox = document.querySelector(".search-box");
const searchbutton = document.querySelector(".search-btn");

searchbutton.addEventListener('click', getWeather);

function getWeather() {
    getresults(searchbox.value);
}

searchbox.addEventListener('keypress', setQuery);

function setQuery(e) {
    if (e.keyCode == 13) {

      
        getresults(searchbox.value);


    }
}

function getresults(query) {

    fetch(`${api.baseurl}weather?q=${query}&units=metric&appid=${api.key}`)
        .then(weather => {
            return weather.json();
        }).then(displayResults);
}

function displayResults(weather) {
    console.log(weather);
    let city = document.querySelector('.location .city');
    city.innerText = `${weather.name},${weather.sys.country}`;

    let now = new Date();
    let date = document.querySelector('.location .date');
    date.innerText = dateBuilder(now);

    let temp = document.querySelector('.current .temp');
    temp.innerHTML = `${Math.round(weather.main.temp)}<span>°C</span>`;

    let weather_name = document.querySelector('.current .weather');
    weather_name.innerText = `${weather.weather[0].main}`;

    let hi_low = document.querySelector('.current .hi-low');
    hi_low.innerText = `${weather.main.temp_min}°C/${weather.main.temp_max}°C`

}

function dateBuilder(d) {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thusday", "Friday", "Saturday"];
    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
}

let clear = document.querySelector(".re-set");
clear.addEventListener('click', event => {
    // let searchbox = document.querySelector(".search-box");
    // searchbox.value=" ";
    location.reload();
})

function currentTime() {
  var date = new Date(); /* creating object of Date class */
  var hour = date.getHours();
  var min = date.getMinutes();
  var sec = date.getSeconds();
  var midday = "AM";
  midday = (hour >= 12) ? "PM" : "AM"; /* assigning AM/PM */
  hour = (hour == 0) ? 12 : ((hour > 12) ? (hour - 12): hour); /* assigning hour in 12-hour format */
  hour = updateTime(hour);
  min = updateTime(min);
  sec = updateTime(sec);
  document.getElementById("clock").innerText = hour + " : " + min + " : " + sec + " " + midday; /* adding time to the div */
    var t = setTimeout(currentTime, 1000); /* setting timer */
}

function updateTime(k) { /* appending 0 before time elements if less than 10 */
  if (k < 10) {
    return "0" + k;
  }
  else {
    return k;
  }
}

currentTime();