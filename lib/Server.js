var express    = require('express');
var http       = require('http');
var https      = require('https');
var json       = require('json');
var urlencode  = require('urlencode');
var bodyParser = require('body-parser')
var routes     = require('./routes');



var server = function (config) {
  this.config = config;
  this.express = express();
 

  this.express.use(bodyParser.urlencoded({ extended: true }));
  this.express.use(bodyParser.json())
  this.express.use(express.static('public'));
  this.express.use(function(err, req, res, next){
    console.error(err.stack);
    console.log(req)
    res.send({error: true});
  });


  return this;
};

server.prototype.start = function () {
  var _this = this;


  var server = http.createServer(_this.express);
  routes.createRoutes(_this.express, server);
  server.listen(_this.config.port, '0.0.0.0');


};

module.exports = server;