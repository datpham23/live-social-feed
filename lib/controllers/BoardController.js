var path = require('path');
var configs = require('../configs.js');
var logger = require('winston');
var randomString = require('randomstring');

/**
 * TODO refactor to use document store.
 *
 */

var boardConfigs  = {};
var socketNameSpace = "/configuration";

module.exports.initialize = function (express , io) {

	var apiVersion = "/api/v1";
	var routes = {
		board : path.join(apiVersion,"board",":boardId"),
		create : path.join(apiVersion,"board","new"),
		allBoards : path.join(apiVersion,"boards")
	}

	logger.debug("Initializing routes");
	logger.debug(routes);


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
		socket.join(socket.handshake.query.boardId);

		socket.on('saveConfig',function (configs) {
			boardConfigs[this.boardId] = configs;
			io.of(socketNameSpace).to(this.boardId).emit('newConfigs',  boardConfigs[this.boardId]);
		}.bind({boardId : socket.handshake.query.boardId , socket : socket}));

	})

}

module.exports.getConfigs = function(){
	return boardConfigs;
}