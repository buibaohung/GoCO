const Facility = require('../model/facility')
var { getEnv } = require('../util/env');

const eosServBaseURL = getEnv('EOS_SERV_BASE_URL', 'http://localhost:4000')

module.exports = (data) => {
    return fetch(`${eosServBaseURL}/account/by-name/${data.user}`)
    .then(res => res.json())
    .then(jsonData => {
        return Facility.create({
            id: data.id,
            name: data._name,
            type: data.type,
            eosUsername: data.user,
            publicKey: jsonData.result,
            email: data.email,
            phoneNumber: data.phone_number,
            location: data.location,
            website: data.website,
        })
    })
}
