const ProductItem = require('../model/productItem')

module.exports = (data) => {
    return ProductItem.destroy({
        where: {
            id: data.id,
        }
    })
}
