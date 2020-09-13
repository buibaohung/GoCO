const ProductImage = require('../model/productImage')

module.exports = (data) => {
    return ProductImage.destroy({
        where: {
            id: data.id,
        }
    })
}
