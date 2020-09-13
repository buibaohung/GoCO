var messages = require('../../proto/domain/domain_pb');
var grpc = require('grpc');
var eos = require('../../eos')

exports.newProductImage = (productImage, eosAccount) => {
    let data = {
        id: productImage.getId(),
        productId: productImage.getProductId(),
        ipfsHash: productImage.getImageId(),
    }
    
    return eos.callAction("newproimage", data, eosAccount.getName(), eosAccount.getPrivateKey())
}

exports.deleteAllProductImages = (productID, eosAccount) => {
    let data = {
        productId: productID,
    }
    
    return eos.callAction("delproimages", data, eosAccount.getName(), eosAccount.getPrivateKey())
}

exports.deleteProductImage = (id, eosAccount) => {
    let data = {
        id: id,
    }
    
    return eos.callAction("delproimage", data, eosAccount.getName(), eosAccount.getPrivateKey())
}