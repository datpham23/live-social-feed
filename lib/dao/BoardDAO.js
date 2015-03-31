var path = require('path');
var logger = require('winston');
var _ = require("underscore");
var ig = require('../vendorAPI').instagram;
var server = require('../server');


/**
 * Eventually will be in a document store, running in memory for now
 *
 */

var boardConfigs = {}


module.exports.boardConfigs = boardConfigs;