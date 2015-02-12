var path = require('path');
var TestController = require('./controllers/TestRestController');
var TestWebSocketController = require('./controllers/TestWebSocketController');

var version = "/v1";

module.exports.createRoutes = function (express, websocket , server) {
 
  new TestController(path.join(version,'test'),express,websocket)
  new TestWebSocketController(path.join(version,'socket'),express,websocket,server)

};