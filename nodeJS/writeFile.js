var fs = require('fs');
var data = {
    school: 'BCIT',
    course: 'ACIT 1630',
    program: 'D3'
}
fs.writeFile('data.json', JSON.stringify(data), (err) =>{
    console.log("finished writing file", err);
});