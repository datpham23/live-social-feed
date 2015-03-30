var path = require('path');
var logger = require('winston');
var randomString = require('randomstring');
var _ = require("underscore");
var ig = require('../vendorAPI').instagram;
var server = require('../server');


/**
 * TODO refactor to use document store.
 *
 */

var boardConfigs  = {};
var socketNameSpace = "/configuration";

module.exports.initialize = function () {

	var express = server.expressApp;
	var io = server.socketIO;

	var apiVersion = "/api/v1";
	var routes = {
		board : path.join(apiVersion,"board",":boardId"),
		create : path.join(apiVersion,"board","new"),
		allBoards : path.join(apiVersion,"boards")
	}


	express.get(routes.board, function(req,res){
		var board = boardConfigs[req.params.boardId];
		if(board)
			res.json(board);
		else
			res.send(404,"Board Not Found");
	});

	express.post(routes.create, function(req,res){
		var id = randomString.generate(4).toLowerCase();
		boardConfigs[id] = req.body;
		res.end(id);
	});


	express.get(routes.allBoards, function(req,res){
		res.json(boardConfigs);
	});

	express.post("/test/publish/configs/:boardId", function(req,res){
		io.of(socketNameSpace).to(req.params.boardId).emit("newConfigs",req.body);
		res.end();
	});


	io.of(socketNameSpace).on('connection',function(socket){
		console.log("xxxx")
		console.log(socket)
		//socket.join(socket.handshake.query.boardId);
		//
		//socket.on('saveConfig',function (configs) {
		//	//console.log(socket.rooms)
		//	//
		//	//subscribeToRooms(socket,configs);
		//	//boardConfigs[this.boardId] = configs;
		//	//io.of(socketNameSpace).to(this.boardId).emit('newConfigs',  boardConfigs[this.boardId]);
		//	//var s = io.of("/instagram").connected[socket.id];
		//	console.log(socket.id);
		//	console.log("0xxxxxxxxx");
		//	console.log(io.of("/instagram").connected);
		//	console.log("1xxxxxxxxx");
		//	console.log(io.of("/instagram").connected[socket.id])
		//	console.log("2xxxxxxxxx");
		//	//console.log(s);
		//	//console.log(s.rooms);
		//	//console.log(socket.rooms);
		//	//console.log(io.of("/instagram").sockets.socket(socket.id).rooms)
		//}.bind({boardId : socket.handshake.query.boardId , socket : socket}));

	})

}


function subscribeToRooms(socket,configs){

	//_.each(configs.instagramTags, function(tag){
	//	var callBackURL = 'http://'+server.ip+'/callback';
	//	console.log(callBackURL);
	//
	//	ig.add_tag_subscription(tag, callBackURL,[], function(err, result, remaining, limit){
	//		if(err){
	//			logger.error(err)
	//			logger.error("Unable to subscribe to tag :"+tag)
	//		}else{
	//			socket.join(tag);
	//		}
	//	}.bind({tag:tag}));
	//})

}

module.exports.getConfigs = function(){
	return boardConfigs;
}