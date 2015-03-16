var path = require('path');
var InstagramCallback = require('./controllers/InstagramController');
var TestWebSocketController = require('./controllers/TestWebSocketController');


module.exports.createRoutes = function (express, websocket , server) {
 

  //InstgramAPI can only use /callback , nothing else will work
  new InstagramCallback(path.join('/'),express,websocket,server)
  new TestWebSocketController(path.join('socket'),express,websocket,server)

};