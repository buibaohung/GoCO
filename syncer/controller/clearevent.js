const Event = require('../model/event')

module.exports = (data) => {
    return Event.destroy({
        where: {}
    })
}
