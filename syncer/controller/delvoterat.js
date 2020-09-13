const VoteRating = require('../model/voteRating')
const User = require('../model/user')

module.exports = (data) => {
    return User.findOne({
        where: {
            eosUsername: data.owner,
        },
    })
    .then(user => {
        return VoteRating.destroy({
            where: {
                ratingId: data.rattingId,
                userId: user.id,
            }
        })
    })
}
