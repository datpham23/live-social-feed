var Server    = require('./lib/server')
var configs   = require('./lib/configs');
var logger    = require('winston');
var path      = require('path');

logger.level = configs.logLevel || "debug";

//Log maxsize 20mb
logger.add(logger.transports.File, { filename: path.join(__dirname,'app.log'), level: "debug", maxsize: 20000000});

logger.debug("=============== Loading Configs ===================");
logger.debug(configs);
logger.debug("===================================================");
logger.debug("=============== Starting Server ===================");
Server.start();
logger.debug("===================================================");
