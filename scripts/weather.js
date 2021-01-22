const key = "51xG65tMakl9eaIPegfhBHayys68fbMs";

const getCityCode = async(city) => {
    const baseURL = "http://dataservice.accuweather.com/locations/v1/cities/search";
    const parameters = "?apikey=" + key + "&q=" + city;

    const response = await fetch(baseURL + parameters);
    const data = await response.json();

    return data[0];
}

const getWeatherConditions = async(locationKey) => {
    const baseURL = "http://dataservice.accuweather.com/currentconditions/v1/" + locationKey;
    const parameters = "?apikey=" + key;

    const response = await fetch(baseURL + parameters);
    const data = await response.json();

    return data[0];
}

/* getCityCode('albacete').then((data) => {
    return getWeatherConditions(data.Key);
}).then((data) => {
    console.log(data);
}).catch((err) => {
    console.log(err);
}); */