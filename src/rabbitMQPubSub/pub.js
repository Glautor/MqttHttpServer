#!/usr/bin/env node

/**
 * The message publisher (sender)
 * The publisher will connect to RabbitMQ and send a message
 */

var amqp = require('amqplib/callback_api');

const rabbitMQPub = (retrivedQueue, retrivedValue) => {
    console.log(retrivedQueue, retrivedValue)
        //connect to RabbitMQ server
        amqp.connect('amqp://localhost', function (errConnection, connection) {

            if (errConnection) {
                throw errConnection;
            }

            //create a channel
            connection.createChannel(function (errChannel, channel) {

                if (errChannel) {
                    throw errChannel;
                }

                // //getting args from terminal
                // argsRetrived = process.argv.slice(2)
                // // get witch queue to send throught
                // retrivedQueue = argsRetrived[0]
                // // get value to send throught queue
                // retrivedValue = argsRetrived[1]

                //declare a queue for us to send to
                let queue = retrivedQueue || 'No queue passed';
                //recebendo uma mensagem via console, caso ela esteja em branco, envia um Hello World
                let msg = retrivedValue || 'No value passed';
            
                channel.assertQueue(queue, {
                    durable: false
                });
            
                //publish a message to the queue:
                channel.sendToQueue(queue, Buffer.from(msg));

                console.log(" [x] Sent %s through %s", msg, queue);

            });

            setTimeout(function () {
                connection.close();  
            }, 500);


        })
}

module.exports = rabbitMQPub