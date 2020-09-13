const Sequelize = require('sequelize');
const sequelize = require('../config/pg')
var ProductImage = sequelize.define("product_image", {
    id: {
        type: Sequelize.BIGINT,
        primaryKey: true,
    },
    productId: {
        type: Sequelize.BIGINT,
    },
    imageId: {
        type: Sequelize.BIGINT,
    },
    
})

module.exports = ProductImage