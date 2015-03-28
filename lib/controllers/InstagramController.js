var path = require('path');
var ig = require('instagram-node').instagram();
var configs = require('../configs.js');
var socketio = require('socket.io');
var externalip = require('externalip');
var async = require("async");
var logger = require('winston');


module.exports.initialize = function (express,server) {
	var root = "/instagram";

	this.ip;
	var _this = this;
	var io = socketio(server);

		//Must be done in synchronously
		//1. Find public ip address first
		//2. Use public ip address to set up web hook
		//3. Delete all subscriptions
		//4. Create subscriptions from configs

	io.sockets.on('connection', function (socket) {
		console.log(socket.handshake.query.tags);
	});


		async.waterfall([
			function(callback){
			  externalip(function (err, ip) {
					_this.ip = ip;
					callback(err,ip)
			  })
			},
			function(ip, callback){
				ig.use({ client_id: configs.instagram.client_id,
					client_secret: configs.instagram.client_secret
				});

				ig.del_subscription({ all: true }, function(err, subscriptions, remaining, limit){
					if(err){
						logger.error("Instagram: Unable to subscribe tags");
						logger.error(err);
					}

					callback(err)
				});
			},
			function(callback){
				var requests = [];


				for(var i in configs.instagram.tags){
					var tag = configs.instagram.tags[i];
					requests.push(
						function(requestCallback) {
							var callBackURL = 'http://'+_this.ip+'/callback';
							console.log(callBackURL)
							ig.add_tag_subscription(this.tag, callBackURL,[], function(err, result, remaining, limit){
								requestCallback(null)

							});
						}.bind({"tag":tag})
					)
				}

				async.series(requests,
					function(err, results){
						callback(err);
					}
				);

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
				if(err)
					res.status(500).end(err);

				res.json(results);
			});
		});

		express.delete(path.join(root,"subscriptions",":tagId"), function(req,res){
			ig.del_subscription({id:req.params.tagId}, function(err,subscriptions){
				if(err)
					res.status(500).end(err);

				res.json(subscriptions);
			})
		});

		express.get(path.join(root,"recent",":hastag"), function(req,res){
			ig.tag_media_recent(req.params.hastag, [], function(err, medias) {
				if(err)
					res.status(500).send(err);

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

};


