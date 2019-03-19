module.exports.diceroll = function(rollingCount) {
    console.log("let's roll a dang ol' die");

    const _ = require('lodash');

    var rolls = [];
    var i;
    for (i = 0; i < rollingCount; i++) {
        var rand = _.random(1, 6);
        rolls.push(rand);
        console.log('Your roll was', rand);
        console.log('All your rolls are', rolls);
        

        var sum = rolls.reduce((a, b) => a + b, 0);
        console.log('Your total right now is', sum);
        if ((sum == 2)||(sum == 3)||(sum == 12)) {
            console.log('You lose lol.');
            break;
        } else if ((sum == 7)||(sum == 11)) {
            console.log('You win.');
            break;
        } else if (i == (rollingCount - 1)) {
            console.log('You have no more rolls');
            break;
        }
    }
}