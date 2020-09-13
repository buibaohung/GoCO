var messages = require('../../../proto/domain/domain_pb');
var grpc = require('grpc');
var { newProduct, deleteProduct, updateProduct, getProductByID } = require('../../../endpoints/product')

exports.newProduct = (call, callback) => {
    let product = call.request.getProduct();
    let eosAccount = call.request.getEosAccount();

    newProduct(product, eosAccount)
    .then(tx=>{
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

exports.deleteProduct = (call, callback) => {
    let productID = call.request.getProductId();
    let eosAccount = call.request.getEosAccount();

    deleteProduct(productID, eosAccount)
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

exports.updateProduct = (call, callback) => {
    let product = call.request.getProduct();
    let productID = call.request.getProductId();
    let name = product.getName();
    let avatar = product.getAvatar();
    let description = product.getDescription();
    let eosAccount = call.request.getEosAccount();
    
    updateProduct(productID, name, avatar, description, eosAccount)
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

exports.getProductByID = (call, callback) => {
    let id = call.request.getId();
    
    getProductByID(id)
    .then(product=>{
        let pbProduct = new messages.Product();
        pbProduct.setId(product.id);
        pbProduct.setName(product._name);
        pbProduct.setAvatar(product.avatar);
        pbProduct.setFacilityId(product.facility_id);
        callback(null, pbProduct);
    })
    .catch(error=>{
        console.log(error.json);
        callback({
            code: grpc.status.INVALID_ARGUMENT,
            message: error.message,
        });
    })
}