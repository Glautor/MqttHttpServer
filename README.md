# RabbitMQ Publisher/Subscriber

>Aplicação que utiliza RabbitMQ como software de enfileiramento de mensagens (intermediário de mensagens ou gerenciador de filas). As filas são definidas, às quais os aplicativos se conectam para transferir mensagens ou para receber.

## Componentes

* Produtor: Envia as mensagens para um tópico
* Consumidor: Espera para receber as mensagens de um tópico ao qual está inscrito
* Fila: Fica dentro do RabbitMQ. Armazena as mensagens que fluem através do RabbitMQ. Muitos produtores podem enviar mensagens que vão para uma fila e muitos consumidores podem tentar receber dados de uma fila.


## Ambientação RabbitMQ

Instalar RabbitMQ e Erlang:

>https://computingforgeeks.com/how-to-install-latest-rabbitmq-server-on-ubuntu-18-04-lts/

Verificar se server está rodando:

```bash
sudo systemctl status  rabbitmq-server.service
```

## Utilidades

Verificar mensagens em fila:

```bash
sudo rabbitmqctl list_queues
```

## Instalação do projeto
```bash
npm install
```

## Uso

* Iniciar aplicação
```bash
node src/index.js 
=> server disponível em http://localhost:4000
```

* Iniciar subscriber
```bash
node src/rabbitMQPubSub/sub.js [topic]
```
> exemplo: node sub.js AR TEMPERATURA

* Enviar topico e mensagem via Publisher
```bash
curl -d "topic=TEMPERATURA&msg=20" http://localhost:4000/sendMessage
```

