class WeatherForecast{
    constructor(){
        this.key = "51xG65tMakl9eaIPegfhBHayys68fbMs";
        this.baseCityURL = "http://dataservice.accuweather.com/locations/v1/cities/search";
        this.baseWeatherURL = "http://dataservice.accuweather.com/currentconditions/v1/";
    }

    async getCityInfo(city){
        const cityobject = await this.getCityCode(city);
        const weather = await this.getWeatherConditions(cityobject.Key);
    
        // devolvemos el objeto de la ciudad completo y tambien el tiempo 
        return {
            cityobject: cityobject, 
            weather: weather
        };
        // equivalente a: return {cityobject, weather}
        // se presupone que cityobject es tanto el nombre como el valor de la primera propiedad del objeto, 
        // y weather es tanto el nombre como el valor de la segunda propiedad
    
    };

    async getCityCode(city){
        const parameters = "?apikey=" + this.key + "&q=" + city;
    
        const response = await fetch(this.baseCityURL + parameters);
        const data = await response.json();
    
        return data[0];
    }

    async getWeatherConditions(citikey){
        const parameters = citikey + "?apikey=" + this.key;
        
        const response = await fetch(this.baseWeatherURL + parameters);
        const data = await response.json();

        return data[0];
    }

}

/* getCityCode('albacete').then((data) => {
    return getWeatherConditions(data.Key);
}).then((data) => {
    console.log(data);
}).catch((err) => {
    console.log(err);
}); */