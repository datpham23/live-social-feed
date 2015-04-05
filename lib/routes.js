var path = require('path');
var InstagramController = require('./controllers/InstagramController');
var BoardController = require('./controllers/BoardController');
var SocketsManager = require('./controllers/SocketsManager');
var OauthController = require('./controllers/OauthController');



module.exports.createRoutes = function (express, io) {

	OauthController.intialize();
  //BoardController.initialize();
  //InstagramController.initialize();
  //SocketsManager.intialize();
};