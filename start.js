var server    = require('./lib/server')
var configs   = require('./lib/configs');
var logger    = require('winston');
var path      = require('path');
var users     = require('./lib/dao/UsersDAO');
var db         = require('./lib/db/database');
var async     = require('async');

logger.level = configs.logLevel || "debug";

db.initialize(function(e){
	//users.createUser('xyz',function(err,result){
	//	//console.log(err);
	//	//console.log("xxxx");
	//	//console.log(result);
	//
	//	users.getUser('xyz',function(err,user){
	//		user.instagramToken = "abc";
	//
	//		users.updateUser(user,function(err,cb){
	//			console.log(err);
	//			console.log(user);
	//		})
	//	});
	//});

});



logger.level = configs.logLevel || "debug";

//Log maxsize 20mb
logger.add(logger.transports.File, { filename: path.join(__dirname,'app.log'), level: "debug", maxsize: 20000000});

logger.debug("=============== Loading Configs ===================");
logger.debug(configs);
logger.debug("===================================================");
logger.debug("=============== Starting Server ===================");
server.start();
logger.debug("===================================================");
