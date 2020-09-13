var messages = require('../../proto/domain/domain_pb');
var grpc = require('grpc');
var eos = require('../../eos')

exports.newProduct = (product, eosAccount) => {
    let data = {
        id: product.getId(),
        _name: product.getName(),
        avatar: product.getAvatar(),
        facility_id: product.getFacilityId(),
        description: product.getDescription(),
    }
    
    return eos.callAction("newproduct", data, eosAccount.getName(), eosAccount.getPrivateKey())
}

exports.deleteProduct = (productID, eosAccount) => {
    let data = {
        id: productID,
    }
    
    return eos.callAction("delproduct", data, eosAccount.getName(), eosAccount.getPrivateKey())
}

exports.updateProduct = (productID, name, avatar, description, eosAccount) => {
    let data = {
        id: productID,
        _name: name,
        avatar,
        description,
    }

    console.log(data);
    
    
    return eos.callAction("updproduct", data, eosAccount.getName(), eosAccount.getPrivateKey())
}

exports.getProductByID = (id) => {
    return new Promise((resolve, reject) => {
        eos.rpc.get_table_rows({
            json: true,
            code: eos.contract,
            scope: eos.contract,
            table: "product",
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