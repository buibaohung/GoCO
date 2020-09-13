const Facility = require('../model/facility')

module.exports = (data) => {
    return Facility.destroy({
        where: {
            name: data.user,
        }
    })
}
