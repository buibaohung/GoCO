const Product = require('../model/product')

module.exports = (data) => {
    return Product.destroy({
        where: {
            id: data.id,
        }
    })
}
