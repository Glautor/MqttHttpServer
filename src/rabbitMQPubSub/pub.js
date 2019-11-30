#!/usr/bin/env node

/**
 * The message publisher (sender)
 * The publisher will connect to RabbitMQ and send a message
 */

var amqp = require('amqplib/callback_api');

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


        //declare a queue for us to send to
        var queue = 'pub_sub_meetup28'
        //recebendo uma mensagem via console, caso ela esteja em branco, envia um Hello World
        var msg = process.argv.slice(2).join(' ') || 'Hello World!';
    
        channel.assertQueue(queue, {
            durable: false
          });
      
        //publish a message to the queue:
        channel.sendToQueue(queue, Buffer.from(msg));

        console.log(" [x] Sent %s", msg);
    });

    setTimeout(function () { connection.close(); process.exit(0) }, 500);


})