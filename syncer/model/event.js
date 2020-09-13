const Sequelize = require('sequelize');
const sequelize = require('../config/pg')
var Event = sequelize.define("event", {
    id: {
        type: Sequelize.BIGINT,
        primaryKey: true,
    },
    name: {
        type: Sequelize.TEXT,
    },
    productItemId: {
        type: Sequelize.BIGINT,
    },
    createdAt: {
        type: Sequelize.DATE,
    },
    fromFacilityId: {
        type: Sequelize.BIGINT,
    },
    toFacilityId: {
        type: Sequelize.BIGINT,
    },
    deliveredByFacilityId: {
        type: Sequelize.BIGINT,
    },
    soldAt: {
        type: Sequelize.DATE,
    },
    fromProductItemId: {
        type: Sequelize.BIGINT,
    },
    toProductItemId: {
        type: Sequelize.BIGINT,
    },
    transactionId: {
        type: Sequelize.TEXT,
    },
})

module.exports = Event