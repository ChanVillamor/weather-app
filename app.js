const apiKey = '350d6bffa36c654c976e9d1b2ac7337e';
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather?units=metric&q=';

const searchBox = document.querySelector('.search-box input');
const searchBtn = document.querySelector('.search-box button');
const weatherIcon = document.querySelector('.weather-icon');

let dateTime = document.querySelector('.weather-date');


async function checkWeather (city) {
   const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

   if (response.status === 404) {
      document.querySelector('.error').style.display = 'block';
      document.querySelector('.weather-box').style.display = 'none';
   } else {
      var data = await response.json();

      document.querySelector('.city').innerHTML = data.name;
      document.querySelector('.temp').innerHTML = Math.round(data.main.temp) + '°c';
      document.querySelector('.humidity').innerHTML = data.main.humidity + '%';
      document.querySelector('.wind').innerHTML = data.wind.speed + ' km/h';
   
      if (data.weather[0].main === 'Sunshine') {
         weatherIcon.src = 'imgs/sunshine.png';
      } else if (data.weather[0].main === 'Clouds') {
         weatherIcon.src = 'imgs/cloudy.png' ;
      } else if (data.weather[0].main === 'Drizzle') {
         weatherIcon.src = 'imgs/drizzle.png';
      } else if (data.weather[0].main === 'Rain') {
         weatherIcon.src = 'imgs/rain.png';
      } else if (data.weather[0].main === 'Storm') {
         weatherIcon.src = 'imgs/thunder.png';
      } else if (data.weather[0].main === 'Snow') {
         weatherIcon.src = 'imgs/snow.png';
      }

      document.querySelector('.weather-box').style.display = 'block';
      document.querySelector('.error').style.display = 'none';
   }

   // date-time
   function convertTimeStamp(timestamp, timezone){
      const convertTimezone = timezone / 3600; // convert seconds to hours 
   
     const date = new Date(timestamp * 1000);
     
     const options = {
         weekday: "long",
         day: "numeric",
         month: "long",
         year: "numeric",
         hour: "numeric",
         minute: "numeric",
         timeZone: `Etc/GMT${convertTimezone >= 0 ? "-" : "+"}${Math.abs(convertTimezone)}`,
   
       hour12: true,
     }
     return date.toLocaleString("en-US", options)
   }
   dateTime.innerHTML = convertTimeStamp(data.dt, data.timezone); 

}

searchBox.addEventListener('keydown', (e) => {
   if (e.key === 'Enter') {
      checkWeather(searchBox.value);
      }
});
   
searchBtn.addEventListener('click', () => {
   checkWeather(searchBox.value);
});

