const Sequelize = require('sequelize');
const sequelize = require('../config/pg')
var Facility = sequelize.define("facility", {
    id: {
        type: Sequelize.BIGINT,
        primaryKey: true,
    },
    name: {
        type: Sequelize.TEXT,
    },
    type: {
        type: Sequelize.TEXT,
    },
    eosUsername: {
        type: Sequelize.TEXT,
        field: 'eos_username',
    },
    publicKey: {
        type: Sequelize.TEXT,
        field: 'public_key',
    },
    email: {
        type: Sequelize.TEXT,
    },
    phoneNumber: {
        type: Sequelize.TEXT,
        field: 'phone_number',
    },
    location: {
        type: Sequelize.TEXT,
    },
    website: {
        type: Sequelize.TEXT,
    },
})

module.exports = Facility