require('dotenv').config()
var grpc = require('./delivery/grpc');
var httpServer = require('./delivery/http');
var eos = require('./eos');

eos.connect().then(()=>{
    httpServer.start();

    grpc.initServer();
})
.catch(error=>console.error(error))