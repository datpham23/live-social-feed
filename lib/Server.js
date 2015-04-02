var express       = require('express');
var http          = require('http');
var json          = require('json');
var bodyParser    = require('body-parser')
var routes        = require('./routes');
var configs       = require('./configs.js');
var socketio      = require('socket.io');
var externalip    = require('externalip');
var cookieParser  = require('cookie-parser');
var users         = require('./dao/UsersDAO');
var randomString  = require('randomstring');
var logger        = require('winston');

var io;
var ip;
var expressApp;

var start = function () {
  externalip(function (err, externalIp) {
    ip = externalIp;
    var app = express();
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.use(cookieParser());
    app.use(function (req, res, next) {
      var cookie = req.cookies[configs.cookieName];
      if (cookie === undefined){
        logger.debug("User doesn't have cookie. Creating user and cookie...")
        var randomHex = randomString.generate(8);
        var user = {id : randomHex};
        createUserAndWriteCookie(user,res,function(){
          next();
        })
      }else{
        next();
      }
    });
    app.use(express.static('public'));

    //Global interceptor to check and set cookie


    var server = http.createServer(app);
    io = socketio(server);


    module.exports.socketIO = io;
    module.exports.ip = ip;
    module.exports.expressApp = app;

    routes.createRoutes();
    server.listen(configs.port, '0.0.0.0');
  })
};


function createUserAndWriteCookie(user,res,cb){

  users.createUser(user,function(err,status){
    if(err) {
      logger.error('Unable to create user');
    }else{
      logger.debug("User inserted, writing cookie...")
      res.cookie(configs.cookieName,user.id, { maxAge: 1000000, httpOnly: true });
      cb();
    }
  })
}

module.exports.start = start;
module.exports.createUserAndWriteCookie = createUserAndWriteCookie;