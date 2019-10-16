var mqtt = require('mqtt');

var client  = mqtt.connect("ip:port", {clientId:"user21"});
console.log(`connected flag  ${client.connected}`);

async function mqttConnection(topic, message) {
    client.on('message', (topic, msg, packet) => {
        console.log(`message is ${msg}`);
        console.log(`topic is ${topic}`);
    });

    client.on("connect", () => {	
        console.log(`connected  ${client.connected}`);
    })

    client.on("error", (error) => {
        console.log(`Can't connect: ${error}`);
        process.exit(1);
    });

    function publish(topic, msg, options){
        console.log("publishing", msg);
        if (client.connected == true){
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

    publish(topic,message,options);

    console.log("end of script");

    setTimeout(() => {}, 10000);
}

module.exports = mqttConnection;