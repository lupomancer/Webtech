const request = require('request');

var getWeather = (country_name, callback) => {

    request({
        url: `https://restcountries.eu/rest/v2/name/${country_name}?fullText=true`,
        json: true
    }, (error, response, body) => {
        if (error) {
            callback('Cannot connect to Weather');
        } else if (body.cod == 400) {
            callback('Cannot find requested points');
        } else
        if (body.cod == 200) {
            callback(undefined, {
                city: body.name,
                temperature: body.main.temp,
                description: body.weather[0].description
            });
        }
    });
};

module.exports = {
    getWeather
};

