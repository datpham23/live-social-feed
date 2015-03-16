var path = require('path');
var fs = require('fs');


module.exports = function() {
  var configString = fs.readFileSync(path.resolve(process.cwd(), 'config.json'));
  var configs = JSON.parse(configString);
  return configs;
};