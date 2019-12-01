let grpc = require("grpc");
var protoLoader = require("@grpc/proto-loader");
 
const server = new grpc.Server();
const SERVER_ADDRESS = "0.0.0.0:5001";
 
// Load protobuf
let proto = grpc.loadPackageDefinition(
  protoLoader.loadSync("src/protos/message.proto", {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true
  })
);
 
let devices = [];
 
// Receive message from client joining
function join(call, callback) {
  devices.push(call);
  notify({ device: "Server", text: "new device joined ..." });
}
 
// Receive message from client
function send(call, callback) {
  notify(call.request);
}
 
// Send message to all connected clients
function notify(message) {
  devices.forEach(device => {
    device.write(message);
  });
}


// Define server with the methods and start it
server.addService(proto.example.Servico.service, { join: join, send: send });
 
server.bind(SERVER_ADDRESS, grpc.ServerCredentials.createInsecure());
 
server.start();