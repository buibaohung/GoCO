const VoteRating = require('../model/voteRating')

module.exports = (data) => {
    return VoteRating.destroy({
        where: {}
    })
}
