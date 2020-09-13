const ProductImage = require('../model/productImage')

module.exports = (data) => {
    return ProductImage.create({
        id: data.id,
        productId: data.productId,
        imageId: data.ipfsHash,
    })
}
