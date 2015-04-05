var server    = require('./lib/server')
var configs   = require('./lib/configs');
var logger    = require('winston');
var path      = require('path');
var users     = require('./lib/dao/UsersDAO');
var db         = require('./lib/db/database');
var async     = require('async');

logger.level = configs.logLevel || "debug";


logger.debug("=============== Loading Configs ===================");
logger.debug(configs);
logger.level = configs.logLevel || "debug";

logger.debug("=============== Connecting to DB  =================");
db.initialize();

//Log maxsize 20mb
logger.add(logger.transports.File, { filename: path.join(__dirname,'app.log'), level: "debug", maxsize: 20000000});
logger.debug("=============== Starting Server ===================");
server.start();
logger.debug("===================================================");
