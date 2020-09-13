const ProductItem = require('../model/productItem')
const Facility = require('../model/facility')

module.exports = (data, authorizations) => {
    if (authorizations.length <= 0) {
        return Promise.resolve()
    }

    let authorization = authorizations[0]
    return Facility.findOne({
        where: {
            eosUsername: authorization.actor,
        },
    })
    .then(facility => {
        return ProductItem.create({
            id: data.id,
            productId: data.productId,
            price: data.price,
            ownerId: facility.get('id'),
            fromProductItemId: data.fromProductItemId || null,
            expiryDate: new Date(data.expiryDate*1000),
        })
    })
}
