var Server = require('./lib/server')
var configs = require('./lib/configs');
var logger = require('winston');

logger.level = configs.logLevel || "debug";

logger.debug("=============== Loading Configs ===================");
logger.debug(configs);
logger.debug("===================================================");
logger.debug("=============== Starting Server ===================");
Server.start();
logger.debug("===================================================");
