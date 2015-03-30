var path = require('path');
var ig = require('../vendorAPI').instagram;
var configs = require('../configs.js');
var server = require('../server');
var async = require("async");
var logger = require('winston');



module.exports.initialize = function () {

	var express = server.expressApp;
	var io = server.socketIO;
	var root = "/instagram";
	var socketNameSpace = "/instagram";

	var _this = this;



	async.waterfall([
		function(callback){
			ig.del_subscription({ all: true }, function(err, subscriptions, remaining, limit){
				if(err){
					logger.error("Instagram: Unable to subscribe tags");
					logger.error(err);
				}

				callback(err)
			});
		},
		function(callback){
			//var requests = [];
			//
			//
			//for(var i in configs.instagram.tags){
			//	var tag = configs.instagram.tags[i];
			//	console.log(tag);
			//	requests.push(
			//		function(requestCallback) {
			//			var callBackURL = 'http://'+server.ip+'/callback';
			//			console.log(callBackURL);
			//			ig.add_tag_subscription(this.tag, callBackURL,[], function(err, result, remaining, limit){
			//				requestCallback(null)
			//
			//			});
			//		}.bind({"tag":tag})
			//	)
			//}
			//
			//async.series(requests,
			//	function(err, results){
			//		callback(err);
			//	}
			//);

			callback();

		}
		], function (err, result) {
				if(err) {
					logger.error("Instagram controller initialized unsuccessfully");
					logger.error(error);
				}else {
					logger.debug("Instagram controller initialized successfully");
				}

		}
	);

  //InstgramAPI can only use /callback , nothing else will work
	//Handshake callback with IG
	express.get("/callback", function(req,res){
		if (!req.query['hub.challenge']) return res.send(400);
		return res.send(200,req.query['hub.challenge']);
	});

	//InstgramAPI can only use /callback , nothing else will work
	express.post("/callback", function(req, res){
		var data = req.body;
		logger.debug("Instagram callback");
		logger.debug(data);

		// Instagram returns a bundle object which has an id where you must make another call to get all the posts
		// Client side will make call to the following url pattern to get latests posts
		//'http://api.instagram.com/v1/tags/' + bundle.object_id + '/media/recent?client_id='+configs.instagram.client_id;
		io.emit('newInstagramPosts', {
		  newBundles : data,
		  client_id : configs.instagram.client_id
		});

		res.end();
	});

	express.get(path.join(root,"subscriptions"), function(req,res){
		ig.subscriptions(function(err, results, remaining, limit){
			console.log(err)
			if(err)
				res.status(500).json(err);

			res.json(results);
		});
	});

	express.delete(path.join(root,"subscriptions",":tagId"), function(req,res){
		ig.del_subscription({id:req.params.tagId}, function(err,subscriptions){
			if(err)
				res.status(500).json(err);

			res.json(subscriptions);
		})
	});

	express.get(path.join(root,"recent",":hastag"), function(req,res){
		ig.tag_media_recent(req.params.hastag, [], function(err, medias) {
			if(err)
				res.status(500).json(err);

			res.json(medias);
		});
	});


	express.get(path.join(root,"save","tags"), function(req,res){
	console.log('saving tags')
	// Instagram.tags.recent({
	//   name: req.params.tag,
	//   complete: function(posts){
	//     res.json(posts)
	//   }
	// });
	res.end()
	});


	express.get("/publish", function(req,res){
		io.of(socketNameSpace).to("a").emit("test","a");
		io.of(socketNameSpace).to("b").emit("test","b");
		io.of(socketNameSpace).to("c").emit("test","c");
		res.end();
	});


	io.of(socketNameSpace).on('connection',function(socket){
		console.log(socket);
		socket.join('a');
		socket.join('b');
		socket.join('c');
	})

};


