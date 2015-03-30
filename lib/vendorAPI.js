var ig = require('instagram-node').instagram();
var configs = require('./configs');
var server = require('./server');


ig.use({ client_id: configs.instagram.client_id,
	client_secret: configs.instagram.client_secret
});


module.exports = {
	instagram : ig
}