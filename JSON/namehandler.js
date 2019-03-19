console.log('starting namehandler.js');
const fs = require('fs');

var add = (object) => {
    var resultString = JSON.stringify(object);
    fs.writeFileSync(`${object.Name}.json`, resultString+'\n');
};

var get = (name) => {
    var prelim = fs.readFileSync(name + '.json');
    var overThirty = JSON.parse(prelim);
    if (overThirty.Age >= 30) {
        console.log(overThirty);
    } else {
        console.log('There are no objects with an age greater than 30');
    }
    };

var remove =(name) => {
    fs.writeFileSync(name + '.json', "");
};

module.exports = {
    add: add,
    get: get,
    remove: remove
};