const mqttConnection = require('./mqttConnection');
const express = require('express');
const bodyParser = require('body-parser');

var app = express();

const TOPIC = 'devices/recebe';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.post('/sendMessage', (req, res) => {
    try {
        mqttConnection(TOPIC, req.body.message);
        res.send('ok');
    } catch(error) {
        res.send(error);
    }
});

app.listen(4000, () => {
    console.log(`Server running on port 4000`)
});