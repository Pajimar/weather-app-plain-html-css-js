const form = document.querySelector('.user-form');
const input = document.getElementById('city');
const card = document.querySelector('.card');
const text = document.querySelector('.text');

const image = document.querySelector('.image');
const icon = document.querySelector('.icon img'); // etiqueta img dentro de clase icon
const weatherobject = new WeatherForecast()

const updateUI = (data) => {

    const cityobject = data.cityobject;
    const weather = data.weather;
    // es equivalente a:
    // const {cityobject, weather} = data
    // se llama destructuring (sacar propiedades de un objeto y almacenarlas 
    // en variables del mismo nombre)

    console.log(cityobject)
    const html = `
    <h5 class="city-name">${cityobject.EnglishName}</h5>
    <div class="weather-condition">${weather.WeatherText}</div>
    <div class="temperature">
        <span>${weather.Temperature.Metric.Value}</span>
        <span>&deg;C</span>
    </div>
    `;

    // insertar plantilla en text 
    text.innerHTML = html;
    card.classList.remove('displaynone');

    icon.setAttribute('src', "img/" + weather.WeatherIcon + ".png");
    image.setAttribute('src', weather.IsDayTime ? "img/day.svg" : "img/night.svg");
}


form.addEventListener('submit', (e) => {
    // prevent reload page
    e.preventDefault();

    const city = input.value.trim();
    
    
    // save city in local storage
    localStorage.setItem('city', city);

    weatherobject.getCityInfo(city)
        .then(data => updateUI(data))
        .catch(err => console.log(err));
})

// se ejecutará nada mas cargar la pagina (no espera por eventos ni nada)
if(localStorage.getItem('city')){
    //city exists in local storage
    weatherobject.getCityInfo(localStorage.getItem('city'))
        .then(data => updateUI(data))
        .catch(err => console.log(err))
}
