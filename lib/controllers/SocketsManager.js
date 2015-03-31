var path = require('path');
var logger = require('winston');
var _ = require("underscore");
var ig = require('../vendorAPI').instagram;
var server = require('../server');
var url = require('url');
var boardConfigs = require('../dao/BoardDAO').boardConfigs;
var async = require("async");
//
//var nameSpace = {
//	instagram : "/instagram"
//};

module.exports.intialize = function(){
	var io = server.socketIO;
	var express = server.expressApp;
	var apiVersion = "/api/vi"


	/*
		Subscribe to instagram with the given tags, then tell the socket to join the room for those tags
		room is a hash of "/instagram/"+hash(hashTag)
	 */
	//express.post(path.join(apiVersion,"subscribe-socket",":socketId"),function(req,res){
	//	var configs = req.body;
	//
	//	var requests = [];
	//	for(var i in configs.instagram.tags){
	//		var tag = configs.instagram.tags[i];
	//		requests.push(
	//			function() {
	//				var callBackURL = 'http://'+server.ip+'/callback';
	//				ig.add_tag_subscription(this.tag, callBackURL,[], function(err, result, remaining, limit){
	//					if(err)
	//						logger.error("Unable to subscribe to tag: " +err)
	//
	//				});
	//			}.bind({"tag":tag})
	//		)
	//	}
	//
	//	async.parallel(requests,
	//		function(err, results){
	//			console.log("done");
	//		}
	//	);
	//})

	io.on('connection',function(socket){
		socket.join(socket.handshake.query.boardId);

		socket.on('saveConfig',function (configs) {
			boardConfigs[this.boardId] = configs;
			socket.broadcast.to(this.boardId).emit('newConfigs',  boardConfigs[this.boardId]);
		}.bind({boardId : socket.handshake.query.boardId , socket : socket}));


		socket.on('subscribeToTags',function(configs){
			var requests = [];
			for(var i in configs.instagram.tags){
				var tag = configs.instagram.tags[i];
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

			async.parallel(requests,
				function(err, results){
					console.log("done");
				}
			);
		})
	});
}
