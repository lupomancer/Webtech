/* eslint-disable no-console */
const express = require('express');
const req = require('request');

const app = express();
const country = 'Iran';

var weather ='';

app.use(express.static(__dirname + '/public'));

app.get('/', (request, response) => {
    // hey here's a json baby
    response.send('<a href="http://localhost:8080/about.html">About </a><a href="http://localhost:8080/weather">Weather</a>');
});

app.get(`/weather`, (request, response) => {
    response.send(weather);
});

app.get('/404', (request, response) => {
    response.send({
        error: 'Page not found',
    });
});

app.listen(8080, () => {
    var getCapital = () => {
        return new Promise((resolve, reject) => {
            req({
                url: `https://restcountries.eu/rest/v2/name/${country}`,
                json: true
            }, (error, response, body) => {
                if (body.status != 404) {
                    resolve(body[0].capital);
                } else {
                    reject('error');
                }
            });
        });
    };


    var getWeather = (city_name) => {
        return new Promise((resolve, reject) => {
            req({
                url: `http://api.openweathermap.org/data/2.5/weather?q=${city_name}&units=imperial&appid=ca0d584d92175d1108ab8ca90981b4b2`,
                json: true
            }, (error, response, body) => {
                if (!error) {
                    var obj = {
                        degrees: body.main.temp,
                        wind_speed: body.wind.speed
                    };
                    resolve(obj);
                } else {
                    reject('error');
                }
            });
        });
    };


    getCapital(country).then((capital) => {
        getWeather(capital).then((result) => {
            weather = `The weather in ${capital}, capital of ${country} is ${result.degrees} degrees Fahrenheit with wind speed of ${result.wind_speed}`;
        });
    }).catch((error) => {
        weather = `Error, ${country} not found!`;
    });
    console.log('Server is up on the port 8080');
});
