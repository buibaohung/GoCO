var messages = require('../../proto/domain/domain_pb');
var grpc = require('grpc');
var eos = require('../../eos')

exports.newEvent = (event, eosAccount) => {
    let data = {
        id: event.getId(),
        productItemId: event.getProductItemId(),
        _name: event.getName(),
        createdAt: event.getCreatedAt(),
        fromFacilityId: event.getFromFacilityId(),
        toFacilityId: event.getToFacilityId(),
        deliveredByFacilityId: event.getDeliveredByFacilityId(),
        soldAt: Math.max(event.getSoldAt(), 0),
        fromProductItemId: event.getFromProductItemId(),
        toProductItemId: event.getToProductItemId(),
        quality: event.getQuality(),
        productItemIds: event.getProductItemIdsList() || [],
    }
    
    return eos.callAction("newevent", data, eosAccount.getName(), eosAccount.getPrivateKey())
}