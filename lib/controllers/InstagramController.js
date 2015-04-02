var path          = require('path');
var ig            = require('../vendorAPI').instagram;
var configs       = require('../configs.js');
var server        = require('../server');
var async         = require("async");
var logger        = require('winston');
var _             = require('underscore');
var boardConfigs  = require('../dao/BoardDAO');
var users         = require('../dao/UsersDAO');



module.exports.initialize = function () {

	var express = server.expressApp;
	var io = server.socketIO;
	var apiVersion = "/api/v1";
	var root = "/instagram";
	var socketNameSpace = "/instagram";

	var _this = this;



	async.waterfall([
		function(callback){
			ig.del_subscription({ all: true }, function(err, subscriptions, remaining, limit){
				if(err){
					logger.error("Instagram: Unable to delete all subscriptions");
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


	var redirectUrl = 'http://'+server.ip+'/instagram/auth-callback';

	express.get(path.join(root,'authorize-user',":boardId"), function(req, res) {
		res.redirect(ig.get_authorization_url(redirectUrl, {x: '1',state: req.params.boardId }));
	});

	/*
		On auth call back we give the boardid an access token so that the client can make calls to instagram without using up our client API calls limit.
		We also save
	 */
	express.get(path.join(root,'/auth-callback'), function(req, res) {
		ig.authorize_user(req.query.code, redirectUrl, function(err, result) {
			if (err) {
				logger.error(err);
				res.send('Unable To Authenticate With Instagram '+err+" Please Try Again");
			} else {
				var boardId = req.query.state;

				console.log(boardConfigs[boardId]);

				//Alot of this code will be removed when theres a DB
				if(Object.keys(boardConfigs[boardId]).length == 0)
					boardConfigs[boardId].instagram = {
						tags : []
					};

				console.log(boardConfigs[boardId]);

				boardConfigs[boardId].instagram.accessToken = result.access_token;
				users[req.cookies.__pulsar__].instagramAcessToken = result.access_token;

				console.log(users);
				res.redirect("/#/configure/"+req.query.state);
			}
		});
	});

  //InstgramAPI can only use /callback , nothing else will work
	//Handshake callback with IG
	express.get("/callback", function(req,res){
		if (!req.query['hub.challenge']) return res.send(400);
		return res.status(200).send(req.query['hub.challenge']);
	});

	//InstgramAPI can only use /callback , nothing else will work
	express.post("/callback", function(req, res){
		var bundles = req.body;
		logger.debug("Instagram callback");
		console.log(bundles);

		// Instagram returns a bundle object which has an id where you must make another call to get all the posts
		// Client side will make call using the following url pattern to get latests posts
		//'http://api.instagram.com/v1/tags/' + bundle.object_id + '/media/recent?client_id='+configs.instagram.client_id;



		_.each(bundles, function(bundle) {
			io.sockets.in("/ig/"+bundle.object_id).emit("newInstagramPosts",{
				newBundle : bundle
			})
		});

		res.end();
	});

	express.get(path.join(apiVersion,root,"subscriptions"), function(req,res){
		ig.subscriptions(function(err, results, remaining, limit){
			console.log(results);

			console.log(err)
			if(err)
				res.status(500).json(err);

			res.json(results);
		});
	});

	express.delete(path.join(apiVersion,root,"subscriptions",":tagId"), function(req,res){
		ig.del_subscription({id:req.params.tagId}, function(err,subscriptions){
			if(err)
				res.status(500).json(err);

			res.json(subscriptions);
		})
	});

	express.delete(path.join(apiVersion,root,"subscriptions"), function(req,res){
		ig.del_subscription({ all: true }, function(err, subscriptions, remaining, limit){
			if(err){
				logger.error("Instagram: Unable to delete all subscriptions");
				logger.error(err);
				res.send(500,"Unable to delete subscriptions: "+err);
			}

			res.end("Subscriptions Deleted Successfully");
		});
	});

	express.get(path.join(apiVersion,root,"recent",":hastag"), function(req,res){
		ig.tag_media_recent(req.params.hastag, [], function(err, medias) {
			if(err)
				res.status(500).json(err);

			res.json(medias);
		});
	});


};


