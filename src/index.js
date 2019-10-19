const mqttConnection = require('./mqttConnection');
const express = require('express');
const bodyParser = require('body-parser');

var app = express();

var TemperatureSingleton = require('./singleton/TemperatureSingleton.js');

var messages = require('./models/messages');

const TOPIC = 'devices/recebe';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.post('/sendMessage', (req, res) => {
    try {
        mqttConnection(TOPIC, req.body.message);
        res.send('success');
    } catch(error) {
        res.send(error);
    }
});

app.post('/getTemperature', (req, res) => {
    try {
        const temperatureInstance = new TemperatureSingleton();
        console.log(messages.TemperatureSensor.decode(temperatureInstance.getTemperatureSensor()));
        // res.send(`${temperatureInstance.getTemp()}`);
        res.send(temperatureInstance.getTemperatureSensor());
    } catch(error) {
        console.log(error);
        res.send(error);
    }
});

app.post('/startConnection', (req, res) => {
    try {
        mqttConnection(TOPIC, 'INIT');
        res.send('success');
    } catch(error) {
        res.send(error);
    }
});

app.listen(4000, () => {
    console.log(`Server running on port 4000`)
});