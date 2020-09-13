const express = require('express');
const accountRoutes = express.Router();
const { newEOSAccount, getPubFromName } = require('../../../endpoints/account')
const { response_express: {success, fail} } = require('../../../util/response')

accountRoutes.post('/', (req, res) => {
    newEOSAccount()
    .then(account => success(res, account))
    .catch(err => fail(res, 500, err.message || err, 1000))
});

accountRoutes.get('/by-name/:name', (req, res) => {
    getPubFromName(req.params.name)
    .then(pub => success(res, pub))
    .catch(err => fail(res, 500, err.message || err, 1000))
});

module.exports = accountRoutes;