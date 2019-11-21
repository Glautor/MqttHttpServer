var amqp = require('amqplib/callback_api');

async function rabbitMqWorker(queue, message) {
    amqp.connect('amqp://localhost:5672', function (err, conn) {
        conn.createChannel(function (err, ch) {
            ch.assertQueue(queue, { durable: false });
            ch.prefetch(1);
            console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", q);
            ch.consume(q, function (msg) {
                console.log(" [x] Received %s", msg.content.toString());
            }, { noAck: true });
        });
    });
}

module.exports = rabbitMqWorker;