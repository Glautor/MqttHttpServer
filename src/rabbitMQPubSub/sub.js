#!/usr/bin/env node

/**
 * The message consumer
 * Consumer run to listen for messages and print them out
 */


var amqp = require('amqplib/callback_api');
    
    //open a connection
    amqp.connect('amqp://localhost', function (errConnection, connection) {

        if (errConnection) {
            throw errConnection;
        }

        //open a channel
        connection.createChannel(function (errChannel, channel) {

            if (errChannel) {
                throw errChannel;
            }

            let choosedTopics = process.argv.slice(2)
            console.log(" [*] Waiting for messages in %s topic. To exit press CTRL+C", choosedTopics);  

            choosedTopics.forEach(function(item,index){
                console.log(item)

                let queue = item;
             
                /**
                 * declare the queue from which we're going to consume
                 * we want to make sure the queue exists before we try to consume messages from it
                 */
                channel.assertQueue(queue, {
                    durable: false
                });

                /**
                 * tell the server to deliver us the messages from the queue. 
                 * it will push us messages asynchronously, we provide a callback that will be executed when RabbitMQ pushes messages to our consumer.
                 */
                channel.consume(queue, function(msg) {
                    console.log(" [x] Received %s", msg.content.toString());
                }, {
                    noAck: true
                });
            });

        });


    })



