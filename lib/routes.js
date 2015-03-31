var path = require('path');
var InstagramController = require('./controllers/InstagramController');
var BoardController = require('./controllers/BoardController');
var SocketsManager = require('./controllers/SocketsManager');



module.exports.createRoutes = function (express, io) {

  BoardController.initialize();
  InstagramController.initialize();
  SocketsManager.intialize();
};