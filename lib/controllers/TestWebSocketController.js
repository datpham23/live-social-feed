var path = require('path');


var TestWebSocketController = function (root, express, websocket, server) {

  websocket.installHandlers(server, {prefix:path.join(root,'hello')});
  websocket.on('connection', function(conn) {
      conn.on('data', function(message) {
          conn.write(message);
          console.log(message)
      });
  });

  
};

module.exports = TestWebSocketController;