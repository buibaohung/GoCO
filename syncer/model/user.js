const Sequelize = require('sequelize');
const sequelize = require('../config/pg')
var User = sequelize.define("user", {
    id: {
        type: Sequelize.BIGINT,
        primaryKey: true,
    },
    name: {
        type: Sequelize.TEXT,
    },
    phoneNumber: {
        type: Sequelize.TEXT,
    },
    passwordHash: {
        type: Sequelize.TEXT,
    },
    eosUsername: {
        type: Sequelize.TEXT,
    },
})

module.exports = User