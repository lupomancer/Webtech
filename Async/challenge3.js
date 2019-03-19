/* jshint esversion: 6 */
const request = require("request");
const yargs = require("yargs");

const argv = yargs
    .options({
        a: {
            demand: true,
            alias: 'address',
            describe: 'Search for an address',
            string: true
        }
    })
    .help()
    .argv;

request({
    url: `https://maps.googleapis.com/maps/api/geocode/json?address=${argv.address}&key=AIzaSyD5qEnd2gGV8Ph2GHzel3pGjlT4fnCrlVw`,
    json: true
}, (error, response, body) => {
    console.log(`Your requested venue: ${argv.address}`);
    console.log(`Address: ${JSON.stringify(body.results[0].formatted_address, undefined, 2)}`);
    console.log(`Status code: ${JSON.stringify(body.status, undefined, 2)}`);
    console.log(`Location type: ${JSON.stringify(body.results[0].geometry.location_type, undefined, 2)}`);
});
