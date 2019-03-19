var express = require('express'); var app = express(); 
var bodyParser = require("body-parser");
var app = express(); //make a new server
var fs = require('fs');

//make a new server
app.use(express.static(__dirname)); //set the root folder  
//configure body-parser for express
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.post('/login', function(req, res) {
    var username = req.body.user;
    var pass = req.body.pass;
    
    if(req.body.user == "Scooby" && req.body.pass== "Do"){
        res.send('<h1>Success</h1>');
    }else{
        res.send('<h1>Login Incorrect</h1>');       
    } 
});
app.get('/listUsers', function (req, res) {
    fs.readFile(__dirname + "/" + "users.json", 'utf8', function (err, data) {
        console.log(data);
        res.end(data);
    });
});
var server = app.listen(8081, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log("Example app listening at http://%s:%s", host, port);
});
app.post('/addUser', function (req, res) {
    // First read existing users.
    fs.readFile(__dirname + "/" + "users.json", 'utf8', function (err, data) {
        data = JSON.parse(data); data["user4"] = user["user4"]; console.log(data);
        res.end(JSON.stringify(data));
    });
});
app.get('/:id', function (req, res) {
    // First read existing users.
    fs.readFile(__dirname + "/" + "users.json", 'utf8', function (err, data) {
        var users = JSON.parse(data);
        var user = users["user" + req.params.id]; console.log(user);
        res.end(JSON.stringify(user));
    });
});
var id = 2;
app.delete('/deleteUser', function (req, res) {
    // First read existing users.
    fs.readFile(__dirname + "/" + "users.json", 'utf8', function (err, data) {
        data = JSON.parse(data); delete data["user" + 2];
        console.log(data);
        res.end(JSON.stringify(data));
    });
});
var user = {
    "user4": {
        "name": "mohit", "password": "password4", "profession": "teacher", "id": 4
    }
};
//listen for requests on port 3000 
var server = app.listen(3000, () =>{ 
	console.log('server is listening on port',server.address().port); 
}); 