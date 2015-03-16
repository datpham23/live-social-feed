var Server = require('./lib/server.js') 
var path = require('path');
var fs = require('fs');


var configs = require('./lib/configReader.js')();

console.log("=============== Loading Configs ===================");
console.log(configs);
console.log("===================================================");
console.log("=============== Starting Server ===================");
new Server(configs).start();
console.log("===================================================");


