var path            = require('path');
var server          = require('../server');


module.exports.initialize = function () {

	var express = server.expressApp;

	var apiVersion = "/api/v1";
	var routes = {
		getUser : path.join(apiVersion,"user")
	}


	express.get(routes.getUser, function(req,res){
		if(req.user)
			res.json(req.user);
		else
			res.status(404).send('No User Logged In');
	});

}
