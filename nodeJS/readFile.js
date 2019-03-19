var fs = require('fs');
fs.readFile('./crime_shp_2017.json', 'utf8', function read(err, data){
    if (err) {
        throw err;
    }
    var result = JSON.parse(data);
    console.log(result);
});