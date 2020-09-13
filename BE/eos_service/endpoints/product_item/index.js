var messages = require('../../proto/domain/domain_pb');
var grpc = require('grpc');
var eos = require('../../eos')

exports.newProductItem = (productItem, eosAccount) => {
    let data = {
        id: productItem.getId(),
        productId: productItem.getProductId(),
        price: productItem.getPrice(),
        owner: productItem.getOwner(),
        fromProductItemId: productItem.getFromProductItemId(),
        expiryDate: productItem.getExpiryDateTimestamp(),
    }
    
    return eos.callAction("newpitem", data, eosAccount.getName(), eosAccount.getPrivateKey())
}

exports.deleteProductItem = (productItemID, eosAccount) => {
    let data = {
        id: productItemID,
    }
    
    return eos.callAction("delproitem", data, eosAccount.getName(), eosAccount.getPrivateKey())
}

exports.getProductItemByID = (id) => {
    return new Promise((resolve, reject) => {
        eos.rpc.get_table_rows({
            json: true,
            code: eos.contract,
            scope: eos.contract,
            table: "productitem",
            lower_bound: id,
            limit: 1,
            reverse: false,
            show_payer: true,
        })
        .then(data => {
            if (data.rows.length <= 0) {
                throw "Not found product"
            }

            resolve(data.rows[0].data)
        })
        .catch(reject)
    })
}