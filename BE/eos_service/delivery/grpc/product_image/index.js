var messages = require('../../../proto/domain/domain_pb');
var grpc = require('grpc');
var eos = require('../../../eos')
var { newProductImage, deleteAllProductImages, deleteProductImage } = require('../../../endpoints/product_image')

exports.newProductImage = (call, callback) => {
    let productImage = call.request.getProductImage();
    let eosAccount = call.request.getEosAccount();

    newProductImage(productImage, eosAccount)
    .then(tx=>{
        console.log(tx);
        
        let resp = new messages.Response();
        resp.setStatus(1);
        callback(null, resp);
    })
    .catch(error=>{
        console.log(error);
        callback({
            code: grpc.status.INVALID_ARGUMENT,
            message: error.message,
        });
    })
}

exports.deleteAllProductImages = (call, callback) => {
    let productID = call.request.getProductId();
    let eosAccount = call.request.getEosAccount();
    
    deleteAllProductImages(productID, eosAccount)
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

exports.deleteProductImage = (call, callback) => {
    let id = call.request.getId();
    let eosAccount = call.request.getEosAccount();
    
    deleteProductImage(id, eosAccount)
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