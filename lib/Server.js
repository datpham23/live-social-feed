var express       = require('express');
var http          = require('http');
var json          = require('json');
var bodyParser    = require('body-parser')
var routes        = require('./routes');
var configs       = require('./configs.js');
var socketio      = require('socket.io');
var externalip    = require('externalip');
var cookieParser  = require('cookie-parser');
var passport      = require('passport');
var session       = require('express-session');



var start = function () {
  externalip(function (err, externalIp) {

    var app = express();
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.use(cookieParser());
    app.set('trust proxy', 1);
    app.use(session({
      secret: 'pulsar',
      resave: false,
      saveUninitialized: false
    }))
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(express.static('public'));


    var server = http.createServer(app);
    var io = socketio(server);


    module.exports.socketIO = io;
    module.exports.ip = externalIp;
    module.exports.expressApp = app;

    routes.createRoutes();
    server.listen(configs.port, '0.0.0.0');
  })
};


module.exports.start = start;