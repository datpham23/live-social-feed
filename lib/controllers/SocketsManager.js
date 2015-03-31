var path = require('path');
var logger = require('winston');
var _ = require("underscore");
var ig = require('../vendorAPI').instagram;
var server = require('../server');
var url = require('url');
var boardConfigs = require('../dao/BoardDAO');
var async = require("async");


module.exports.intialize = function(){
	var io = server.socketIO;
	var express = server.expressApp;
	var apiVersion = "/api/vi"


	io.on('connection',function(socket){
		socket.join(socket.handshake.query.boardId);

		socket.on('saveConfig',function (configs) {
			boardConfigs[this.boardId] = configs;
			socket.broadcast.to(this.boardId).emit('newConfigs',  boardConfigs[this.boardId]);
		}.bind({boardId : socket.handshake.query.boardId , socket : socket}));


		socket.on('setSocketSubscriptions',function(configs){
			var requests = [];
			for(var i in configs.instagramTags){
				var tag = configs.instagramTags[i];
				this.join("/ig/"+tag);

				requests.push(
					function() {
						var callBackURL = 'http://'+server.ip+'/callback';
						ig.add_tag_subscription(this.tag, callBackURL,[], function(err, result, remaining, limit){
							if(err)
								logger.error("Unable to subscribe to tag: " +err)

						});
					}.bind({"tag":tag})
				)
			}

			async.series(requests,
				function(err, results){
					//console.log("done");
					res.end();
				}
			);
		})
	});
}


//this.join(crypto.createHash('md5').update(configs.instagram.tags[i]).digest('hex'));