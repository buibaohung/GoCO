const Event = require('../model/event')
const ProductItem = require('../model/productItem')
const sequelize = require('../config/pg')
const EventAggregation = require('../model/eventAggregation')

module.exports = (data, authorization, id) => {
    let proms = []
    let productItemIds = data.productItemIds || []
    productItemIds.forEach(productItemId => {
        let p = sequelize.query("SELECT next_id('event_aggregations_id_seq')", {
            type: sequelize.Sequelize.QueryTypes.SELECT
        })
        .then(results => {
            let nextID = results[0].next_id;
            return EventAggregation.create({
                id: nextID,
                productItemId,
                eventId: data.id,
            })
        })

        proms.push(p)
    });

    return Promise.all(proms)
    .then(()=>{
        return Event.create({
            id: data.id,
            name: data._name,
            productItemId: data.productItemId || null,
            createdAt: new Date(data.createdAt),
            fromFacilityId: data.fromFacilityId || null,
            toFacilityId: data.toFacilityId || null,
            deliveredByFacilityId: data.deliveredByFacilityId || null,
            soldAt: new Date(data.soldAt),
            fromProductItemId: data.fromProductItemId || null,
            toProductItemId: data.toProductItemId || null,
            transactionId: id,
        })
    })
    .then(() => {
        let newOwnerID = -1
        switch (data._name) {
            case "START_DELIVERY":
                newOwnerID = data.deliveredByFacilityId;
                break;
            case "FINISH_DELIVERY":
                newOwnerID = data.toFacilityId;
                break;
        }
        
        if (newOwnerID != -1) {
            return ProductItem.update(
                {
                    ownerId: newOwnerID
                },
                {
                    where: {
                        id: data.productItemId,
                    }
                }
            )
        } else {
            return Promise.resolve()
        }
    })
}
