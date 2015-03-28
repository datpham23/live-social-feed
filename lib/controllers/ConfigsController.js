var path = require('path');
var configs = require('../configs.js');
var logger = require('winston');


module.exports.initialize = function (express,server) {
	var root = "/configs";


	express.get(path.join(root,"tags"), function(req,res){
		var configuredTags = {
			"instagram" : configs.instagram.tags,
			"twitter" : [],
			"vine" : [],
			"facebook" : []
		}

		res.json(configuredTags);
	});

}