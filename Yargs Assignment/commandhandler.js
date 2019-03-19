console.log('Searching...');
const request = require('request');
const fs = require('fs');

const getAddress = (address, callback) => {
    request({
        url: `https://maps.googleapis.com/maps/api/geocode/json?address=${String(address)}&key=AIzaSyD5qEnd2gGV8Ph2GHzel3pGjlT4fnCrlVw`,
        json: true,
    }, (error, response, body) => {
        if (error) {
            callback('Cannot connect to google maps');
        } else if (body.status == 'ZERO_RESULTS') {
            callback('Cannot find requested address');
        } else if (body.status == 'OK') {
            callback(undefined, {
                lat: body.results[0].geometry.location.lat,
                lon: body.results[0].geometry.location.lng,
                address: body.results[0].formatted_address,
            });
        } else {
            callback('UNKNOWN ERROR HAS OCCURRED');
        }
    });
};
const getWeather = (lat, lon, callback) => {
    request({
        url: `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&APPID=7f253b3f0415a60df2a06fad4561a16b&units=metric`,
        json: true,
    }, (error, response, body) => {
        if (error) {
            callback('Cannot connect to weather');
        } else if (body.cod == 200) {
            callback(undefined, {
                city: body.name,
                temp: body.main.temp,
                des: body.weather[0].description,
            });
        } else {
            callback('UNKNOWN ERROR HAS OCCURRED');
        }
    });
};
const add = (object) => {
    if (fs.existsSync('addressbook.json')) {
        const prelim = fs.readFileSync('addressbook.json');
        const json = JSON.parse(prelim);
        json.address[object.Name] = object.Address;
        resultString = JSON.stringify(json);
        fs.writeFileSync('addressbook.json', resultString);
    } else {
        const arr = {'address': {}};
        arr.address[object.Name] = object.Address;
        const resultString = JSON.stringify(arr);
        fs.writeFileSync('addressbook.json', resultString);
    }
};
const get = (name) => {
    const prelim = fs.readFileSync('addressbook.json');
    const json = JSON.parse(prelim);
    if ((json.address).hasOwnProperty(name)) {
        console.log(json.address[name]);
    } else {
        console.log('That address doesn\'t exist');
    }
};
const remove = (name) => {
    const prelim = fs.readFileSync('addressbook.json');
    const json = JSON.parse(prelim);
    if ((json.address).hasOwnProperty(name)) {
        delete json.address[name];
        console.log(json.address);
        console.log('successfully deleted address');
        const resultString = JSON.stringify(json);
        fs.writeFileSync('addressbook.json', resultString);
    } else {
        console.log('That address doesn\'t exist');
    }
};
module.exports = {
    getWeather,
    getAddress,
    add,
    get,
    remove,
};
