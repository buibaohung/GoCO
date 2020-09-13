const Product = require('../model/product')

module.exports = (data) => {
    let update = {}
    if (data._name) {
        update.name = data._name
    }

    if (data.avatar) {
        update.avatar = data.avatar
    }

    if (data.description) {
        update.description = data.description
    }

    return Product.update(
        update,
        {
            where: {
                id: data.id,
            }
        }
    )
}
