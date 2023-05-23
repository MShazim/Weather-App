// Open Weather API Key and URL
const apiKey = "b25a2f499d7c94ef57073bd237f31b16";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

// Some Variables for Searching and Weather Icons
const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");


// Async Function to Give the Weather Data fetch from API.
async function checkWeather(city){
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

    if(response.status == 404){

        //Error Message
        document.querySelector(".error").style.display = "Block";
        document.querySelector(".weather").style.display = "none";
    }else{
        //stores the APIs data in variable
        var data = await response.json();

        //Printing the Data on Console For Easy Handling and Understanding
        console.log(data);

        //To calculate the Day and Date From the APIs Timezone
        let DayDate = new Date(data.dt*1000-(data.timezone*1000));
        let date = DayDate.getDate();
        let month = DayDate.toLocaleString('default', {month: 'short'});

        //Using DOM Selector for displaying data
        document.querySelector(".date").innerHTML = month.toUpperCase() + " " + date;
        document.querySelector(".weather-status").innerHTML = data.weather[0].main
        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML =Math.round(data.main.temp) + "°c";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

        //Conditions for the Weather Status Icon
        if(data.weather[0].main == "Clouds"){
            weatherIcon.src = "Images/clouds.png";
        }else if(data.weather[0].main == "Clear"){
            weatherIcon.src = "Images/clear.png";
        }else if(data.weather[0].main == "Rain"){
            weatherIcon.src = "Images/rain.png";
        }else if(data.weather[0].main == "Drizzle"){
            weatherIcon.src = "Images/drizzle.png";
        }else if(data.weather[0].main == "Mist"){
            weatherIcon.src = "Images/mist.png";
        }else if(data.weather[0].main == "Thunderstorm"){
            weatherIcon.src = "Images/thunderstorm.png";
        }else if(data.weather[0].main == "Haze"){
            weatherIcon.src = "Images/haze.png";
        }else if(data.weather[0].main == "Snow"){
            weatherIcon.src = "Images/snow.png";
        }

        //Hides the Error Block from HTML And Display The Data
        document.querySelector(".weather").style.display = 'Block';
        document.querySelector(".error").style.display = "none";
    }
    
}

// Two Event Listeners
//1. On CLICK of Search Icon
searchBtn.addEventListener("click", ()=>{
    checkWeather(searchBox.value);
});

// 2. On Pressing Enter 
searchBox.addEventListener("keypress", function (e){
    if(e.key === 'Enter'){
        checkWeather(searchBox.value);
    }
});