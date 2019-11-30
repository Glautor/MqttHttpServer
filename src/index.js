const mqttConnection = require('./mqttConnection');
const rabbitMQPub = require('./rabbitMQPubSub/pub');
const express = require('express');
const bodyParser = require('body-parser');
var cors = require('cors');

var app = express();

var TemperatureSingleton = require('./singleton/TemperatureSingleton.js');

var messages = require('./models/messages');

const TOPIC = 'devices/recebe';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/test', (req, res) => {
    try {
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
        res.json({200: "success"});
    } catch(error) {
        res.send(error);
    }
});

// app.post('/sendMessage', (req, res) => {
//     try {
//         mqttConnection(TOPIC, req.body.message);
//         res.send('success');
//     } catch(error) {
//         res.send(error);
//     }
// });

app.post('/sendMessage', (req, res) => {
    try {
        rabbitMQPub(req.body.topic, req.body.msg);
        res.send('success');
    } catch(error) {
        res.send(error);
    }
});

app.post('/getTemperature', (req, res) => {
    try {
        const temperatureInstance = new TemperatureSingleton();
        // console.log(messages.TemperatureSensor.decode(temperatureInstance.getTemperatureSensor())['temperature']);
        res.send(messages.TemperatureSensor.decode(temperatureInstance.getTemperatureSensor())['temperature']);
    } catch(error) {
        console.log(error);
        res.send(error);
    }
});

app.post('/getHumidity', (req, res) => {
    try {
        res.send(`${humidity}%`);
    } catch(error) {
        console.log(error);
        res.send(error);
    }
});

app.post('/startConnection', (req, res) => {
    try {
        console.log(res);
        mqttConnection(TOPIC, 'INIT');
        res.send('success');
    } catch(error) {
        res.send(error);
    }
});

var humidity = 0;
event = () => {
    setTimeout(() => {
        if(humidity < 100) {
            humidity = humidity + 7;
        } else {
            humidity = 0;
        }
        event();
    }, 5000);
}

event();

app.use(cors());

app.listen(4000, () => {
    console.log(`Server running on port 4000`)
});