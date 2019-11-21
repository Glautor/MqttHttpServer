var amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost:5672', function (err, conn) {
    conn.createChannel(function (err, ch) {
            ch.assertQueue('queue', { durable: false });
            ch.sendToQueue('queue', new Buffer('message'));
            console.log(" [x] Sent %s", 'message');
    });
    setTimeout(function () { conn.close(); process.exit(0) }, 500);
});