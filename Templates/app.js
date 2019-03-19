/* eslint-disable no-console */
const request = require('request');
const yargs = require('yargs');

const argv = yargs
    .options({
        c: {
            demand: true,
            alias: 'country',
            describe: 'Country name',
            string: true
        }
    })
    .help()
    .argv;


var getCapital = (country_name) => {
    return new Promise((resolve, reject) => {
       request({
            url: `https://restcountries.eu/rest/v2/name/Canada?fullText=true`,
            json: true
        }, (error, response, body) => {
            if(body.status != 404) {
                resolve(body[0].capital);
            }
            else {
                reject('error');
            }
        });
    });
};


var getWeather = (city_name) => {
    return new Promise((resolve, reject) => {
        request({
            url: `http://api.openweathermap.org/data/2.5/weather?q=${city_name}&units=imperial&appid=ca0d584d92175d1108ab8ca90981b4b2`,
            json: true
        }, (error, response, body) => {
            if(!error) {
                var obj = {
                    degrees: body.main.temp,
                    wind_speed: body.wind.speed
                };
                resolve(obj);
            }
            else {
                reject('error');
            }
        });
    });
};


getCapital(argv.country).then((capital) => {
    getWeather(capital).then((result) => {
        console.log(`The weather in ${capital}, capital of ${argv.country} is ${result.degrees} degrees Fahrenheit with wind speed of ${result.wind_speed}`);
    }).catch((error) => {
        console.log('Error message:', error);
    });
}).catch((error) => {
        console.log('Error message:', error);
});