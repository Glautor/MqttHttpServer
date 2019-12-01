let grpc = require("grpc");
var protoLoader = require("@grpc/proto-loader");
var readline = require("readline");
 
//Read terminal Lines
var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
 
//Load the protobuf
var proto = grpc.loadPackageDefinition(
  protoLoader.loadSync("src/protos/message.proto", {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true
  })
);
 
const REMOTE_SERVER = "0.0.0.0:5001";
 
let device_name;
 
//Create gRPC client
let client = new proto.example.Servico(
  REMOTE_SERVER,
  grpc.credentials.createInsecure()
);
 

function start() {
  let channel = client.join({ device: device_name });
 
  channel.on("data", onData);
 
  rl.on("line", function(text) {
    client.send({ device: device_name, text: text }, res => {});
  });
}
 
function onData(message) {
  if (message.device == device_name) {
    return;
  }
  console.log(`${message.device}: ${message.text}`);
}

function sleep(milliseconds) {
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < milliseconds);
}

device_name = "Produtor"; 
start();
client.send({ device: device_name, text: "15º" }, res => {});

