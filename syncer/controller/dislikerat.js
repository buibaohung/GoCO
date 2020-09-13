const sequelize = require('../config/pg')
const VoteRating = require('../model/voteRating')
const User = require('../model/user')

module.exports = (data, authorization, id) => {    
    let user;
    return User.findOne({
        where: {
            eosUsername: data.owner,
        },
    })
    .then(u => {
        user = u
        return VoteRating.findOne({
            where: {
                ratingId: data.rattingId,
                userId: user.id,
            },
        })
    })
    .then(vote => {
        if (vote) {
            return vote.update(
                {
                    like: -1,
                    stake: data.stakeAmount,
                    transactionId: id,
                }
            )
        } else {
            sequelize.query("SELECT next_id('vote_ratings_id_seq')", {
                type: sequelize.Sequelize.QueryTypes.SELECT
            })
            .then(results => {
                let nextID = results[0].next_id;
                return VoteRating.create({
                    id: nextID,
                    ratingId: data.rattingId,
                    userId: user.id,
                    like: -1,
                    stake: data.stakeAmount,
                    transactionId: id,
                })
            })
        }
    })
}
