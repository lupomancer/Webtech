/* jshint esversion: 6 */
console.log('Starting my Node.JS app');

const fs = require('fs');
const yargs = require('yargs');
const namehandler = require('./namehandler.js');

const argv = yargs
    .command('add', 'Add a new name object', {
        name: {
            describe: 'Your name',
            demand: true,
            alias: 'n'
        },
        age: {
            describe: 'Your age',
            demand: true,
            alias: 'a'
        }
    })
    .command('get', 'Get object info if age > 30', {
        name: {
            describe: 'Name attatched to object',
            demand: true,
            alias: 'n'
        }
    })
    .command('remove', 'Remove object info from file', {
        name: {
            describe: 'Name attatched to object',
            demand: true,
            alias: 'n'
        }
    })
    .help()
    .argv;
var command = process.argv[2];

var object = {
    Name: argv.name,
    Age: argv.age
};

if (command === 'add') {
    console.log('Adding new item');
    namehandler.add(object);
} else if (command === 'get') {
    console.log('Listing object');
    namehandler.get(argv.name);
} else if (command === 'remove') {
    console.log('Removing object');
    namehandler.remove(argv.name);
} else {
    console.log('Unknown command');
}