const Rating = require('../model/rating')
const User = require('../model/user')

module.exports = (data, authorization, id) => {
    return User.findOne({
        where: {
            eosUsername: data.owner,
        },
    })
    .then(user => {
        return Rating.create({
            id: data.id,
            productId: data.productId,
            star: data.star,
            content: data.content,
            stake: data.stakeAmount,
            userId: user.id,
            transactionId: id,
        })
    })
}
