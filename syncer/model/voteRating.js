const Sequelize = require('sequelize');
const sequelize = require('../config/pg')
var VoteRating = sequelize.define("vote_rating", {
    id: {
        type: Sequelize.BIGINT,
        primaryKey: true,
    },
    ratingId: {
        type: Sequelize.BIGINT,
    },
    userId: {
        type: Sequelize.BIGINT,
    },
    like: {
        type: Sequelize.INTEGER,
    },
    stake: {
        type: Sequelize.INTEGER,
    },
    transactionId: {
        type: Sequelize.TEXT,
    },
})

module.exports = VoteRating