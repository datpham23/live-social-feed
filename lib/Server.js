var express    = require('express');
var sockjs     = require('sockjs');
var http       = require('http');
var https      = require('https');
var json       = require('json');
var urlencode  = require('urlencode');
var bodyParser = require('body-parser')
var routes     = require('./routes');
var swaggerExpress = require("swagger-node-express");


var Server = function (config) {
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

  this.websocket = sockjs.createServer({log: function(severity, message) {
  }});

  return this;
};

Server.prototype.start = function () {
  var _this = this;

  
  var server = http.createServer(_this.express);
  routes.createRoutes(_this.express,_this.websocket,server);
  server.listen(_this.config.port, '0.0.0.0');
  
  var swagger = swaggerExpress.createNew(_this.express);
  swagger.configureSwaggerPaths("", "docs", "")
  swagger.configure("http://localhost:"+_this.config.port, "1.0.0");

  var docs_handler = express.static(__dirname + '/../swagger-ui/');
  _this.express.get(/^\/docs(\/.*)?$/, function(req, res, next) {
    if (req.url === '/docs') { // express static barfs on root url w/o trailing slash
      res.writeHead(302, { 'Location' : req.url + '/' });
      res.end();
      return;
    }
    // take off leading /docs so that connect locates file correctly
    req.url = req.url.substr('/docs'.length);
    return docs_handler(req, res, next);
  });

  _this.express.get('/throw/some/error', function(){
    throw {
      status: 500,
      message: 'we just threw an error for a test case!'
    };
  });

};

module.exports = Server;