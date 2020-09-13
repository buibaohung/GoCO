var messages = require('../../../proto/domain/domain_pb');
var grpc = require('grpc');
var { newEvent } = require('../../../endpoints/event')

exports.newEvent = (call, callback) => {
    let event = call.request.getEvent();
    let eosAccount = call.request.getEosAccount();

    newEvent(event, eosAccount)
    .then(tx=>{
        let resp = new messages.Response();
        resp.setStatus(1);
        callback(null, resp);
    })
    .catch(error=>{
        console.log(error.json);
        callback({
            code: grpc.status.INVALID_ARGUMENT,
            message: error.message,
        });
    })
}