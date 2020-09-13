const Rating = require('../model/rating')

module.exports = (data) => {
    return Rating.destroy({
        where: {
            id: data.id,
        }
    })
}
