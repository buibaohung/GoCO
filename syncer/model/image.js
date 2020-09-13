const Sequelize = require('sequelize');
const sequelize = require('../config/pg')
var Image = sequelize.define("image", {
    id: {
        type: Sequelize.BIGINT,
        primaryKey: true,
    },
    ipfsHash: {
        type: Sequelize.TEXT,
        field: 'ipfs_hash'
    },
})

module.exports = Image