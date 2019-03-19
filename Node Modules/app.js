/* jshint esversion: 6 */
console.log('Starting my first app...');

const fs = require('fs');
const os = require('os');
const note = require('./note.js');
const dieroll = require('./challenge/dieroll.js');
const _ = require('lodash');
const readline = require('readline-sync');

var response = readline.question("How many times do you want to roll the die?");
var state = dieroll.diceroll(response);


// var user = os.userInfo();
// console.log(user);

// var res = note.addNewNote();
// console.log(res);

// console.log(_.isString("Hello"));
// console.log(_.uniq([2,1,3,4,5,2,5,3]));

// fs.appendFile("file.txt", `Hello ${user.username}! You are ${note.age} years old!`, "utf8", function(err) {
//     if (err) {
//         console.log("Unable to write to file");
//     }
// });

console.log('Done');