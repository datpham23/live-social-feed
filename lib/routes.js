var path = require('path');
var InstagramCallback = require('./controllers/InstagramController');


module.exports.createRoutes = function (express, server) {
 

  //InstgramAPI can only use /callback , nothing else will work
  new InstagramCallback(path.join('/'),express, server)

};