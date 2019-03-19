const express = require('express');
const req = require('request');
const hbs = require('hbs');

const app = express();
const country = 'Canada';

let weather ='';

hbs.registerPartials(__dirname + '/views/partials');

app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('message', (text) => {
    return text.toUpperCase();
});

const getWeather = (cityName) => {
    return new Promise((resolve, reject) => {
        req({
            url: `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=imperial&appid=ca0d584d92175d1108ab8ca90981b4b2`,
            json: true,
        }, (error, response, body) => {
            if (!error) {
                const obj = {
                    degrees: body.main.temp,
                    wind_speed: body.wind.speed,
                };
                weather = `The weather in ${capital}, capital of ${country} is ${body.main.temp} degrees Fahrenheit with wind speed of ${body.wind.speed}`;
                resolve(weather);
            } else {
                reject(new Error('error'));
            }
        });
    });
};

const getCapital = () => {
    return new Promise((resolve, reject) => {
        req({
            url: `https://restcountries.eu/rest/v2/name/${country}`,
            json: true,
        }, (error, response, body) => {
            if (body.status != 404) {
                resolve(body[0].capital);
            } else {
                reject(new Error('error'));
            }
        });
    });
};

hbs.registerHelper('weather', () => {
    getCapital(country).then((capital) => {
        getWeather(capital).then((result) => {
            return ( `The weather in ${capital}, capital of ${country} is ${result.degrees} degrees Fahrenheit with wind speed of ${result.wind_speed}`);
        });
    });
});

app.get('/', (request, response) => {
    response.render('home.hbs', {
        title: 'home page',
        year: new Date().getFullYear(),
        welcome: 'home!',
    });
});

app.get('/info', (request, response) => {
    response.render('about.hbs', {
        title: 'About page',
        year: new Date().getFullYear(),
        welcome: 'Hello!',
    });
});

app.get(`/weather`, (request, response) => {
    response.render('weather.hbs', {
        title: 'Weather page',
        year: new Date().getFullYear(),
        welcome: 'Weather!',
    });
});

app.get('/404', (request, response) => {
    response.send({
        error: 'Page not found',
    });
});

app.listen(8080, () => {
    const getCapital = () => {
        return new Promise((resolve, reject) => {
            req({
                url: `https://restcountries.eu/rest/v2/name/${country}`,
                json: true,
            }, (error, response, body) => {
                if (body.status != 404) {
                    resolve(body[0].capital);
                } else {
                    reject(new Error('error'));
                }
            });
        });
    };


    const getWeather = (cityName) => {
        return new Promise((resolve, reject) => {
            req({
                url: `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=imperial&appid=ca0d584d92175d1108ab8ca90981b4b2`,
                json: true,
            }, (error, response, body) => {
                if (!error) {
                    const obj = {
                        degrees: body.main.temp,
                        wind_speed: body.wind.speed,
                    };
                    resolve(obj);
                } else {
                    reject(new Error('error'));
                }
            });
        });
    };


    getCapital(country).then((capital) => {
        getWeather(capital).then((result) => {
            weather = `The weather in ${capital}, 
            capital of ${country} is ${result.degrees} 
            degrees Fahrenheit with wind speed of 
            ${result.wind_speed}`;
        });
    }).catch((error) => {
        weather = `Error, ${country} not found!`;
    });
    const weatherHBS = async () => {
        const capital = await getCapital();
        const weatherBody = await getWeather();

        weather = `The weather in ${capital}, capital of ${country} is ${weatherBody.result.degrees} degrees Fahrenheit with wind speed of ${weatherBody.result.wind_speed}`;
        return weather;
    };
    console.log('Server is up on the port 8080');
});
