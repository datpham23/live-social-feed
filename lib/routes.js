var path = require('path');
var InstagramController = require('./controllers/InstagramController');
var BoardController = require('./controllers/BoardController');


module.exports.createRoutes = function (express, io) {

  BoardController.initialize(express,io);


  //setInterval(function(){
  //
  //  console.log(BoardController.getConfigs());
  //},1000)

  //InstagramController.initialize(express,io);

};