var express = require('express');
var mainRoutes = express.Router();

mainRoutes.get('/', function(req, res) {
	res.send('Hello! I am Hieu Dep Trai');
});

mainRoutes.use('/account', require('./account'));

module.exports = mainRoutes;