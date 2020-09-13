const Product = require('../model/product')

module.exports = (data) => {
    return Product.create({
        id: data.id,
        name: data._name,
        facilityId: data.facility_id,
        avatar: data.avatar,
        description: data.description,
    })
}
