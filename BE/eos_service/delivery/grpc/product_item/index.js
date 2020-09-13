var messages = require('../../../proto/domain/domain_pb');
var grpc = require('grpc');
var eos = require('../../../eos')
var { newProductItem, deleteProductItem, getProductItemByID } = require('../../../endpoints/product_item')

exports.newProductItem = (call, callback) => {
    let productItem = call.request.getProductItem();
    let eosAccount = call.request.getEosAccount();

    newProductItem(productItem, eosAccount)
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

exports.deleteProductItem = (call, callback) => {
    let productItemID = call.request.getProductItemId();
    let eosAccount = call.request.getEosAccount();
    
    deleteProductItem(productItemID, eosAccount)
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

exports.getProductItemByID = (call, callback) => {
    let id = call.request.getId();
    
    getProductItemByID(id)
    .then(productItem=>{
        let pbProductItem = new messages.ProductItem();
        pbProductItem.setId(productItem.id);
        pbProductItem.setProductId(productItem.productId);
        pbProductItem.setOwner(productItem.owner);
        pbProductItem.setPrice(productItem.price);
        pbProductItem.setFromProductItemId(productItem.fromProductItemId);
        pbProductItem.setExpiryDateTimestamp(productItem.expiryDate);
        callback(null, pbProductItem);
    })
    .catch(error=>{
        console.log(error.json);
        callback({
            code: grpc.status.INVALID_ARGUMENT,
            message: error.message,
        });
    })
}