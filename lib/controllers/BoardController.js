var path = require('path');
var logger = require('winston');
var randomString = require('randomstring');
var _ = require("underscore");
var ig = require('../vendorAPI').instagram;
var server = require('../server');
var boardConfigs = require('../dao/BoardDAO')


/**
 * TODO refactor to use document store.
 *
 */



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
		console.log(boardConfigs);
		console.log(req.params.boardId);


		var board = boardConfigs[req.params.boardId];

		console.log(board);
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
		console.log(boardConfigs);
		res.json(boardConfigs);
	});

	express.post("/test/publish/configs/:boardId", function(req,res){
		io.of(socketNameSpace).to(req.params.boardId).emit("newConfigs",req.body);
		res.end();
	});


	//var socketNameSpace = "/configuration";
	//io.of(socketNameSpace).on('connection',function(socket){
	//	console.log("xxxx")
	//	console.log(socket)
	//	//socket.join(socket.handshake.query.boardId);
	//	//
	//	socket.on('saveConfig',function (configs) {
	//		//console.log(socket.rooms)
	//		//
	//		//subscribeToRooms(socket,configs);
	//		//boardConfigs[this.boardId] = configs;
	//		//io.of(socketNameSpace).to(this.boardId).emit('newConfigs',  boardConfigs[this.boardId]);
	//		//var s = io.of("/instagram").connected[socket.id];
	//		console.log(socket.id);
	//		console.log("0xxxxxxxxx");
	//		console.log(io.of("/instagram").connected);
	//		console.log("1xxxxxxxxx");
	//		console.log(io.of("/instagram").connected[socket.id])
	//		console.log("2xxxxxxxxx");
	//		//console.log(s);
	//		//console.log(s.rooms);
	//		//console.log(socket.rooms);
	//		//console.log(io.of("/instagram").sockets.socket(socket.id).rooms)
	//	}.bind({boardId : socket.handshake.query.boardId , socket : socket}));
	//
	//})

}
