const Sequelize = require('sequelize');
const sequelize = require('../config/pg')
var ProductItem = sequelize.define("product_item", {
    id: {
        type: Sequelize.BIGINT,
        primaryKey: true,
    },
    productId: {
        type: Sequelize.BIGINT,
        field: 'product_id'
    },
    price: {
        type: Sequelize.INTEGER,
    },
    ownerId: {
        type: Sequelize.BIGINT,
        field: 'owner_id'
    },
    fromProductItemId: {
        type: Sequelize.BIGINT,
        field: 'from_product_item_id'
    },
    expiryDate: {
        type: Sequelize.DATE,
        field: 'expiry_date'
    },
})

module.exports = ProductItem