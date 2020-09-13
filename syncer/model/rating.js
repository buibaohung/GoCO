const Sequelize = require('sequelize');
const sequelize = require('../config/pg')
var Rating = sequelize.define("rating", {
    id: {
        type: Sequelize.BIGINT,
        primaryKey: true,
    },
    productId: {
        type: Sequelize.BIGINT,
        field: 'product_id'
    },
    star: {
        type: Sequelize.INTEGER,
    },
    content: {
        type: Sequelize.TEXT,
    },
    stake: {
        type: Sequelize.INTEGER,
    },
    userId: {
        type: Sequelize.BIGINT,
        field: 'user_id'
    },
    transactionId: {
        type: Sequelize.TEXT,
    },
})

module.exports = Rating