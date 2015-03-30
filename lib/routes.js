var path = require('path');
var InstagramController = require('./controllers/InstagramController');
var BoardController = require('./controllers/BoardController');


module.exports.createRoutes = function (express, io) {

  BoardController.initialize(express,io);
  InstagramController.initialize(express,io);

};