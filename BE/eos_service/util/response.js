var successObj = (result) => {
	return {
		'status':1,
		'result': result,
	}
}

var failObj = (message, errorCode = 404) => {
	return {
		'status':0,
		'error': {
			'code': errorCode,
			'message': message,
		},
	}
}

var response_express = {
	success: (res, result) => {
		console.log("success", result);
		res.json(successObj(result));
	},

	fail: (res, httpCode, message, errorCode) => {
        console.log("fail", message);
		res.status(httpCode).json(failObj(message, errorCode));
	},
};

module.exports={successObj, failObj, response_express}