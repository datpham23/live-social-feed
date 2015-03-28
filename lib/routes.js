var path = require('path');
var InstagramController = require('./controllers/InstagramController');
var ConfigsController = require('./controllers/ConfigsController');
var SocketsManager = require('./controllers/SocketsManager');


module.exports.createRoutes = function (express, server) {

  ConfigsController.initialize(express,server);
  InstagramController.initialize(express,server);
  SocketsManager.initialize(express,server);

};