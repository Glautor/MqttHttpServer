var amqp = require('amqplib/callback_api');

//conectando na fila
amqp.connect('amqp://localhost:5672', function (err, conn) {

    conn.createChannel(function (err, ch) {
        var ex = 'pub_sub_meetup28';
        //recebendo uma mensagem via console, caso ela esteja em branco, envia um Hello World
        var msg = process.argv.slice(2).join(' ') || 'Hello World!';

        //quando será o nome do Exchange e qual será a forma de utilizar
        ch.assertExchange(ex, 'fanout', { durable: false });
        ch.publish(ex, '', new Buffer(msg));
        console.log(" [x] Sent %s", msg);
    });

    setTimeout(function () { conn.close(); process.exit(0) }, 500);


})