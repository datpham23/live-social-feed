var express    = require('express');
var http       = require('http');
var https      = require('https');
var json       = require('json');
var bodyParser = require('body-parser')
var routes     = require('./routes');
var configs = require('./configs.js');


var server = function () {
  this.configs = configs;
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
  var server = http.createServer(this.express);
  routes.createRoutes(this.express, server);
  server.listen(this.configs.port, '0.0.0.0');

};

module.exports = server;