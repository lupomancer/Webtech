const yargs = require('yargs');
const commandhandler = require('./commandhandler');

const argv = yargs
    .command('weather', 'Get weather for specified location', {
        address: {
            demand: true,
            alias: 'address',
            describe: 'search for an address',
            string: true,
            alias: 'a',
        },
    })
    .command('address', 'Get the street address for a specified location', {
        address: {
            demand: true,
            alias: 'address',
            describe: 'search for an address',
            string: true,
            alias: 'a',
        },
    })
    .command('remove', 'Remove object info from file', {
        name: {
            describe: 'Name attatched to object',
            demand: true,
            alias: 'n',
        },
    })
    .command('add', 'Add a new address to the address book', {
        name: {
            describe: 'Location name',
            demand: true,
            alias: 'n',
        },
        address: {
            demand: true,
            alias: 'address',
            describe: 'search for an address',
            string: true,
            alias: 'a',
        },
    })
    .command('get', 'Get an address from the address book', {
        name: {
            describe: 'Name attatched to object',
            demand: true,
            alias: 'n',
        },
    })
    .command('remove', 'Remove an address from the address book', {
        name: {
            describe: 'Name attatched to object',
            demand: true,
            alias: 'n',
        },
    })
    .version('1.0')
    .help()
    .argv;

const command = process.argv[2];

if (command === 'weather') {
    commandhandler.getAddress(argv.a, (errorMessage, results) => {
        if (errorMessage) {
            console.log(errorMessage);
        } else {
            commandhandler.getWeather(results.lat, results.lon, (errorMessage2, results2) => {
                if (errorMessage2) {
                    console.log(errorMessage2);
                } else {
                    console.log(`The weather in ${results2.city} is ${results2.temp} degrees with ${results2.des}`);
                }
            });
        }
    });
} else if (command === 'address') {
    commandhandler.getAddress(argv.a, (errorMessage, results) => {
        if (errorMessage) {
            console.log(errorMessage);
        } else {
            console.log(`Your requested venue: ${argv.address}`);
            console.log(`Address: ${results.address}`);
        }
    });
} else if (command === 'add') {
    commandhandler.getAddress(argv.a, (errorMessage, results) => {
        if (errorMessage) {
            console.log(errorMessage);
        } else {
            const object = {
                Name: argv.name,
                Address: results.address,
            };
            console.log('Adding new address to addressbook');
            commandhandler.add(object);
        }
    });
} else if (command === 'remove') {
    console.log('Removing address');
    commandhandler.remove(argv.name);
} else if (command === 'get') {
    console.log('Listing address');
    commandhandler.get(argv.name);
} else {
    console.log('Unknown command. Type "node addressbook.js --help" for assistance.');
}
