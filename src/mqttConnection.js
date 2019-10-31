var mqtt = require('mqtt');

var client  = mqtt.connect("https://3.15.205.236:1883", {clientId:"user21"});
console.log(`connected flag  ${client.connected}`);

var messages = require('./models/messages');

var TemperatureSingleton = require('./singleton/TemperatureSingleton.js');

var buf = messages.TemperatureSensor.encode({
    temperature: '0ºC',
    name: 'Temperatura',
    topic: 'server/init'
})

const temperatureInstance = new TemperatureSingleton('0ºC', buf);

async function mqttConnection(topic, message) {
    client.on('message', (topic, msg, packet) => {
        if(topic == 'devices/temperatureSensor/envia') {
            temperatureInstance.setTemp(`${msg}`.split(';')[1]);

            var temperatureBuffer = messages.TemperatureSensor.encode({
                temperature: `${msg}`.split(';')[1],
                name: 'Temperatura',
                topic: topic
            });

            temperatureInstance.setTemperatureSensor(temperatureBuffer);

            // console.log(JSON.stringify(packet));
            console.log('mqtt', temperatureInstance.getTemp());
        }
        console.log(`message is ${msg}`);
        console.log(`topic is ${topic}`);
    });

    client.on("connect", () => {	
        console.log(`connected  ${client.connected}`);
    });

    client.on("error", (error) => {
        console.log(`Can't connect: ${error}`);
        process.exit(1);
    });

    function publish(topic, msg, options){
        console.log("publishing", msg);
        if (client.connected == true){
            if(msg == 'turnIn' || msg == 'turnOff') {
                client.publish('devices/soundSystem/recebe', msg, options);
                return 'success'                
            }
            client.publish(topic, msg, options);
            return 'success'
        }
    }

    var options = {
        retain:true,
        qos:1
    };

    console.log("subscribing to topics");

    client.subscribe(topic, { qos:1 });
    client.subscribe('devices/envia', { qos:1 });
    client.subscribe('devices/esp/recebe', { qos:1 });
    client.subscribe('devices/temperature/recebe', { qos:1 });
    client.subscribe('devices/temperatureSensor/envia', { qos:1 });
    client.subscribe('devices/soundSystem/recebe', { qos:1 });

    publish(topic,message,options);

    console.log("end of script");

    setTimeout(() => {}, 10000);
}

module.exports = mqttConnection;