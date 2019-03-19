/* eslint-disable no-console */
//! using coin.io for first BTC price - https://www.coinapi.io
const coinIOapi = 'C8B03600-6E0E-488A-8521-CB727C71E0F7';
//! using cryptocompare for second BTX price - https://min-api.cryptocompare.com
const ccapi = '6d59b2e779d3f65e7b0950d3da49c1311cf09df182a36c2156e2e61633e85e29';
//! using exchangeratesapi.io for exchange rates - https://exchangeratesapi.io
const req = require('request');
const yargs = require('yargs');
const getCountry = require('country-currency-map').getCountry;


const baseCurrency = 'USD';

const argv = yargs
    .command('country', 'Country used to get local currency', {
        country: {
            demand: true,
            alias: 'c',
            describe: 'Your chosen country',
            string: true
        },
    })
    .version('1.0')
    .help()
    .argv;

const command = process.argv[2];

var currency = getCountry(command).currency;


var getRate1 = () => {
    return new Promise((resolve, reject) => {
        req(`https://rest.coinapi.io/v1/exchangerate/BTC/${baseCurrency}?apikey=${coinIOapi}`, {
            json: true
        }, (err, res, body) => {
            if (!err) {
                var rate1 = body.rate;
                resolve(rate1);
            } else {
                reject('error');
            }
        });
    });
};

var getRate2 = () => {
    return new Promise((resolve, reject) => {
        req(`https://min-api.cryptocompare.com/data/price?fsym=BTC&tsyms=${baseCurrency}&api_key={${ccapi}}`, {
            json: true
        }, (err, res, body) => {
            if (!err) {
                var rate2 = body[baseCurrency];
                resolve(rate2);
            } else {
                reject('error');
            }
        });
    });
};

var getExch = () => {
    return new Promise((resolve, reject) => {
        req('https://api.exchangeratesapi.io/latest?base=USD', {
            json: true
        }, (err, res, body) => {
            if (!err) {
                var multiplier = body.rates[currency];
                resolve(multiplier);
            } else {
                reject('error');
            }
        });
    });
};

const getInfo = async () => {
    const rate1 = await getRate1();
    const rate2 = await getRate2();
    const multiplier = await getExch();

    const info = [rate1, rate2, multiplier];
    return info;
};

getInfo().then((info) => {

    const adjRate1 = Math.round((info[0] * info[2]) * 100) / 100;
    const adjRate2 = Math.round((info[1] * info[2]) * 100) / 100;

    console.log();
    console.log(`The exchange rate for 1 BTC is ${adjRate1} ${currency} from CoinAPI`);
    console.log();
    console.log(`The exchange rate for 1 BTC is ${adjRate2} ${currency} from CryptoCompare`);
    console.log();

    if (adjRate2 > adjRate1){
        console.log(`The exchange rate from CryptoCompare (${adjRate2} ${currency}) is higher than CoinAPI (${adjRate1} ${currency})`);
    } else if (adjRate1 > adjRate2){
        console.log(`The exchange rate from CoinAPI (${adjRate1} ${currency}) is higher than CryptoCompare (${adjRate2} ${currency})`);
    } else {
        console.log(`The exchange rates from CoinAPI (${adjRate1} ${currency}) and CryptoCompare (${adjRate2} ${currency}) are equal`);
    }
    console.log();

}).catch((e) => {
    console.log(e);
});

