const Sequelize = require('sequelize');
const sequelize = require('../config/pg')
var EventAggregation = sequelize.define("event_aggregation", {
    id: {
        type: Sequelize.BIGINT,
        primaryKey: true,
    },
    productItemId: {
        type: Sequelize.BIGINT,
    },
    eventId: {
        type: Sequelize.BIGINT,
    },
})

module.exports = EventAggregation