var path = require('path');
var fs = require('fs');

var configString = fs.readFileSync(path.resolve(process.cwd(), 'config.json'));
var configs = JSON.parse(configString);
configs.counter = 0;

module.exports = configs;

