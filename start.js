var Server = require('./lib/server.js') 
var configs = require('./lib/configs.js');
var logger = require('winston');

logger.level = configs.logLevel || "info";

logger.debug("=============== Loading Configs ===================");
logger.debug(configs);
logger.debug("===================================================");
logger.debug("=============== Starting Server ===================");
new Server().start();
logger.debug("===================================================");
