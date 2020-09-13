var messages = require('../../../proto/domain/domain_pb');
var eosServ = require('../../../proto/service/eos/eos_pb');
var grpc = require('grpc');
var { newEOSAccount, getPubFromPriv, getNameFromPub, getPubFromName } = require('../../../endpoints/account')

exports.newEOSAccount = (call, callback) => {
    newEOSAccount()
    .then(data=>{
        let resp = new messages.EosAccount();
        resp.setName(data.name)
        resp.setPrivateKey(data.privateKey)
        resp.setPublicKey(data.publicKey)
        
        callback(null, resp);
    })
    .catch(error=>{
        callback({
            code: grpc.status.INVALID_ARGUMENT,
            message: error.message,
        });
    })
}

exports.getPubFromPriv = (call, callback) => {
    let priv = call.request.getPrivateKey();

    let pub = getPubFromPriv(priv)

    if (pub == null) {
        callback({
            code: grpc.status.INVALID_ARGUMENT,
            message: "Invalid public key",
        });
        return
    }

    let resp = new eosServ.GetPubFromPrivResponse();
    resp.setPublicKey(pub)
    callback(null, resp);
}

exports.getNameFromPub = (call, callback) => {
    let pub = call.request.getPublicKey();
    
    getNameFromPub(pub)
    .then(name=>{
        let resp = new eosServ.GetNameFromPubResponse();
        resp.setName(name)
        
        callback(null, resp);
    })
    .catch(error=>{
        callback({
            code: grpc.status.INVALID_ARGUMENT,
            message: error.message || error,
        });
    })
}

exports.getPubFromName = (call, callback) => {
    let name = call.request.getName();
    
    getPubFromName(name)
    .then(publicKey=>{
        let resp = new eosServ.GetPubFromNameResponse();
        resp.setPublicKey(publicKey)
        
        callback(null, resp);
    })
    .catch(error=>{
        callback({
            code: grpc.status.INVALID_ARGUMENT,
            message: error.message || error,
        });
    })
}