var Server = require('./lib/Server.js')
var path = require('path');
var fs = require('fs');



var configString = fs.readFileSync(path.resolve(__dirname, 'config.json'));
var configs = JSON.parse(configString);

console.log("=============== Loading Configs ===================");
console.log(configs);
console.log("===================================================");
console.log("=============== Starting Server ===================");
new Server(configs).start();
console.log("===================================================");


