const express = require('express');

const app = express();

app.use(express.static(__dirname + '/public'));

app.get('/', (request, response) => {
    // hey here's a json baby
    response.send({
        name: 'Big Dog',
        school: [
            'BCIT',
            'SFU',
            'UBC',
        ],
    });
});

app.get('/info', (request, response) => {
    response.send('My info page');
});

app.get('/404', (request, response) => {
    response.send({
        error: 'Page not found',
    });
});

app.listen(8080, () => {
    console.log('Server is up on the port 8080');
});
