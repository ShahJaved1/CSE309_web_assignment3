const timeEl = document.getElementById('time');
const dateEl = document.getElementById('date');
const currentWeatherItemsEl = document.getElementById('current-weather-items');
const timezone = document.getElementById('time-zone');
const countryEl = document.getElementById('country');
const weatherForecastEl = document.getElementById('weather-forecast');
const currentTempEl = document.getElementById('current-temp');


 const days = ['Sunday', 'Monday', 'Tueday','Wednesday','Thursday','Friday','Saturday']

 const months = ['Jan', 'Feb', 'Mar', 'Apr','May','Jun','Jul','Aug','Sepr','Oct','Nov','Dec']

 const API_KEY ='8ecab28f18c1818de3ad02f07b9ead73';



setInterval(()=>{
    const time = new Date();
    const month = time.getMonth();
    
    const date = time.getDate();
    const day = time.getDate();
    const hour = time.getHours();
    const hoursIn12HrFormat = hour >= 13 ? hour %12: hour
    const minutes = time.getMinutes();
    const ampm = hour >=12 ? 'PM' : 'AM'

    timeEl.innerHTML = hoursIn12HrFormat + ':' + minutes+ ' ' + `<span id="am-pm">${ampm}</span>`

    dateEl.innerHTML = days[day] + ', '+ date+ ' ' + months[month]

}, 1000);

getWeatherData();

function getWeatherData() {
    navigator.geolocation.getCurrentPosition((success)=> {
        console.log(success);

        let{latitude, longitude} = success.coords;
        

 fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=metric&appid=8ecab28f18c1818de3ad02f07b9ead73`)
        .then(response => response.json())
        .then(data =>{
            console.log(data);
            showWeatherData(data);
        })
    })
}

function showWeatherData(data){

    countryEl.innerHTML = `${data.city.coord.lat} N ${data.city.coord.lon} E`

    currentWeatherItemsEl.innerHTML = 

    `
    <img src="https://openweathermap.org/img/wn/${data.list[0].weather[0].icon}@2x.png" alt="weather icon" class="w-icon">
    <p>${data.list[0].weather[0].main}</p>
    <div class="weather-item"  id="box1">
        <div>Humidity</div>
        <div>${data.list[0].main.humidity}%</div>
    </div>

    <div class="weather-item">
        <div>Pressure</div>
        <div>${data.list[0].main.pressure}</div>
    </div>

    <div class="weather-item">
        <div>Wind Speed</div>
        <div>${data.list[0].wind.speed}</div>
    </div>
    
    <div class="weather-item">
        <div>Temperature</div>
        <div>${data.list[0].main.temp}</div>
    </div>
    `
}