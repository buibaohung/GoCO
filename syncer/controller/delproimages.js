const ProductImage = require('../model/productImage')

module.exports = (data) => {
    return ProductImage.destroy({
        where: {
            productId: data.productId,
        }
    })
}
