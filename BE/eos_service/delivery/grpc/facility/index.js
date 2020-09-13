var messages = require('../../../proto/domain/domain_pb');
var grpc = require('grpc');
var { newFacility, getFacilityEOSName, getFacilityByID } = require('../../../endpoints/facility')

exports.newFacility = (call, callback) => {
    let facility = call.request;

    newFacility(facility)
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

exports.getFacilityEOSName = (call, callback) => {
    let eosAccount = call.request;

    getFacilityEOSName(eosAccount.getName())
    .then(facility=>{
        let resp = new messages.Facility();
        resp.setId(facility.id);
        resp.setName(facility._name);
        resp.setEosUsername(facility.user);
        resp.setType(facility.type);
        resp.setEmail(facility.email);
        resp.setPhoneNumber(facility.phone_number);
        resp.setLocation(facility.location);
        resp.setWebsite(facility.website);
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

exports.getFacilityByID = (call, callback) => {
    let id = call.request.getId();

    getFacilityByID(id)
    .then(facility=>{
        let resp = new messages.Facility();
        resp.setId(facility.id);
        resp.setName(facility._name);
        resp.setEosUsername(facility.user);
        resp.setType(facility.type);
        resp.setEmail(facility.email);
        resp.setPhoneNumber(facility.phone_number);
        resp.setLocation(facility.location);
        resp.setWebsite(facility.website);
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