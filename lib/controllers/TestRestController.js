var path = require('path');


var TestController = function (root, express, websocket) {

  express.get(path.join(root,'hello'), function(req,res){
    res.send("hello world")
  });
  
};

module.exports = TestController;