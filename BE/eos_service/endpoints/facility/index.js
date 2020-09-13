var messages = require('../../proto/domain/domain_pb');
var grpc = require('grpc');
var eos = require('../../eos')

exports.newFacility = (facility) => {
    let data = {
        id: facility.getId(),
        _name: facility.getName(),
        user: facility.getEosUsername(),
        type: facility.getType(),
        email: facility.getEmail(),
        phone_number: facility.getPhoneNumber(),
        location: facility.getLocation(),
        website: facility.getWebsite(),
    }
    
    return eos.callAction("newfacility", data)
}

exports.getFacilityEOSName = (accountName) => {
    return new Promise((resolve, reject) => {
        eos.rpc.get_table_rows({
            json: true,
            code: eos.contract,
            scope: eos.contract,
            table: "facility",
            lower_bound: accountName,
            limit: 1,
            reverse: false,
            show_payer: true,
        })
        .then(data => {
            if (data.rows.length <= 0) {
                throw "Not found facility"
            }

            resolve(data.rows[0].data)
        })
        .catch(reject)
    })
}

exports.getFacilityByID = (id) => {
    return new Promise((resolve, reject) => {
        eos.rpc.get_table_rows({
            json: true,
            code: eos.contract,
            scope: eos.contract,
            table: "facility",
            table_key: "id",
            lower_bound: id,
            limit: 1,
            reverse: false,
            show_payer: true,
        })
        .then(data => {
            if (data.rows.length <= 0) {
                throw "Not found facility"
            }

            resolve(data.rows[0].data)
        })
        .catch(reject)
    })
}