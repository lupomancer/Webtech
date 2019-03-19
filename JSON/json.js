const fs = require('fs');

var user = {
    name: 'Cody'
};

var resultString = JSON.stringify(user);
fs.writeFileSync('test.json', resultString);

var readUser = fs.readFileSync('test.json');
var userObject = JSON.parse(readUser);

console.log("My name is " + userObject.name);
console.log(typeof readUser);

/* var user = {
    name: 'Cody'
};

var resultString = JSON.stringify(user);
console.log(typeof resultString);
console.log(resultString);

var user2 = '{"name": "Cody", "age": 27}';
var resultString2 = JSON.parse(user2);

console.log(typeof resultString2);
console.log(resultString2); */