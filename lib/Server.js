var express     = require('express');
var http        = require('http');
var https       = require('https');
var json        = require('json');
var bodyParser  = require('body-parser')
var routes      = require('./routes');
var configs     = require('./configs.js');
var socketio    = require('socket.io');



var io;

var start = function () {
  var app = express();
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json())
  app.use(express.static('public'));
  app.use(function(err, req, res, next){
    console.error(err.stack);
    console.log(req)
    res.send({error: true});
  });


  var server = http.createServer(app);
  io = socketio(server);
  routes.createRoutes(app, io);
  server.listen(configs.port, '0.0.0.0');
};



module.exports = {
  start : start,
  getSocketIo : function(){
    return io;
  }
};