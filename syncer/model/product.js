const Sequelize = require('sequelize');
const sequelize = require('../config/pg')
var Product = sequelize.define("product", {
    id: {
        type: Sequelize.BIGINT,
        primaryKey: true,
    },
    name: {
        type: Sequelize.TEXT,
    },
    facilityId: {
        type: Sequelize.BIGINT,
    },
    avatar: {
        type: Sequelize.TEXT,
    },
    description: {
        type: Sequelize.TEXT,
    },
})

module.exports = Product