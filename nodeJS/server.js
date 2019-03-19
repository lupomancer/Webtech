var express = require('express');
var app = express(); //make a new server
app.use(express.static(__dirname));
//make an endpoint
app.get('/all',(req,res) =>{
    res.send('sending all the data');
});
app.get('/luckynumbers',(req,res) =>{
    var numarr = []
    while (numarr.length < 6){
        var r = Math.floor(Math.random() * 49) + 1;
        if (numarr.indexOf(r) === -1) numarr.push(r);
    }
    res.send('your lucky numbers are ' + numarr);
});
app.get('/rps',(req,res) =>{
    var _ = require('lodash');
    var rps = _.random(1, 3);
    if (rps === 1){
        res.send('Rock!');
    }
    else if (rps === 2){
        res.send('Paper!');
    }
    else if (rps === 3){
        res.send('Scissors!');
    }
});
//listen for requests on port 3000
var server = app.listen(3000, () =>{
    console.log('server is listening on port', server.address().port);
});