console.log('Starting my Node.JS app');

const fs = require('fs');
const yargs = require('yargs');
const todo = require('./todo.js');

const argv = yargs
    .command('add', 'Add a new todo', {
        title: {
            describe: 'Title of note',
            demand: true,
            alias: 't'
        }''
    })
    .help()
    .argv;
var command = process.argv[2];

console.log(argv);

if (command === 'add') {
    console.log('Adding new item');
    todo.addNote(argv.title, argv.content);
} else if (command === 'list') {
    console.log('Listing all items');
} else {
    console.log('Unknown command');
}