var path = require('path');
var vendorAPI = require("./vendorAPI");
var InstagramController = require('./controllers/InstagramController');
var BoardController = require('./controllers/BoardController');


module.exports.createRoutes = function (express, io) {

  BoardController.initialize();
  InstagramController.initialize();

};