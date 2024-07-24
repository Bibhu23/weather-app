const apikey = '2d2fce81810b16d34432c5866d9df5f8'
// const city='odisha'
async function fetchweatherData(city) {
    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apikey}`
        );
        if (!response.ok) {
            throw new Error("unable to fetch weather")
        }
        const data = await response.json();
        console.log(data)
        // console.log(data.main.temp)
        // console.log(data.name)
        // console.log(data.wind.speed)
        // console.log(data.main.humidity)
        // console.log(data.visibility)
        updateweatherUI(data)
    }
    catch (error) {
        console.error(error)
    }
}
const cityElement = document.querySelector(".city");
const temperature = document.querySelector(".temp")
const windspeed = document.querySelector(".wind-speed")
const humidity = document.querySelector(".humidity")
const visibility = document.querySelector(".visibility-distance")
const descriptionText = document.querySelector(".description-text")
const date = document.querySelector(".date")
const descriptionIcon = document.querySelector(".description material-icons")
// fetchweatherData();

function updateweatherUI(data) {
    cityElement.textContent = data.name
    temperature.textContent = `${Math.round(data.main.temp)}`;
    windspeed.textContent = `${data.wind.speed} km/h`; textContent
    humidity.textContent = `${data.main.humidity}°`
    visibility.textContent = `${data.visibility / 1000} km/h`
    descriptionText.textContent = data.weather[0].description;

    const currentDate = new Date();
    dateElement.textContent = currentDate.toDateString();
    const weatherIconName = getweatherIconName(data.weather[0].main)
    descriptionIcon.innerHTML = `<i class="material-icons">${weatherIconName}</i>`
}

const formElement = document.querySelector(".search-form");
const inputElement = document.querySelector(".city-input")
formElement.addEventListener('submit', function (e) {
    e.preventDefault();
    const city = inputElement.value;
    if (city !== '') {
        fetchweatherData(city)
        inputElement.value = ""
    }
})

function getweatherIconName(weatherCondition) {
    const iconMap = {
        Clear: "wb_sunny",
        Clouds: "wb_sunny",
        Rain: "umbrella",
        Thunderstorm: "flash_on",
        Drizzle: "grain",
        Snow: "ac_unit",
        Mist: "cloud",
        Smoke: "cloud",
        Haze: "cloud",
        Fog: "cloud",
    };
    return iconMap[weatherCondition] || "help"
}