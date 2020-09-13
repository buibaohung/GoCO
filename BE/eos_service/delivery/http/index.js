var express = require('express');
var app = express();
var helmet = require('helmet');
var cors = require('cors')
var bodyParser = require('body-parser');
var http = require('http').Server(app);
const { getEnv } = require('../../util/env');

const start = () => {
	return new Promise((resolve, reject)=>{
		app.use(helmet());
		app.use(cors());
		app.use(bodyParser.urlencoded({ extended: false }));
		app.use(bodyParser.json({limit: '50mb', type: ['application/json', 'text/plain']}));
		app.use((err, req, res, next) => {
			reject(new Error('Something went wrong!, err:' + err))
			res.status(500).send('Something went wrong!')
		})
		app.use(function(req, res, next){
			req.body=JSON.parse(JSON.stringify(req.body));
			req.query=JSON.parse(JSON.stringify(req.query));
			next();
		});

		app.use('/', require('./router'));

		let port = getEnv("HTTP_PORT", 4000)
		const server = http.listen(port, "0.0.0.0", ()=>resolve(server));
	});
}

module.exports = {start};