var io = require('socket.io-client');
var _ = require('underscore');
var empty = function(){};



var socketIO;

module.exports = {
	openConnection: function (boardId,connectCB,disconnectCB) {
		socketIO = io.connect(window.location.origin, {
			multiplex : false,
			query: {boardId : boardId}
		});

		socketIO.on('connect', function (socket) {
			if(connectCB)connectCB();
		});

		socketIO.on('disconnect', function (socket) {
			if(disconnectCB)disconnectCB();
		});

		return socketIO;
	},
	closeConnection: function(){
		if(socketIO)
			socketIO.disconnect();

			socketIO = null;
	},
	getSocketIO:function(){
		return socketIO;
	},
	/*
		Board Configuration methods to listen and save configs
	 */
	saveConfiguration:function(config){
		socketIO.emit('saveConfig', config);
	},
	listenForNewConfigs:function(callBack){
		socketIO.on("newConfigs",callBack);
	},
	/*
		Instagram
	 */
	listenForInstagramPosts:function(callBack){
		socketIO.on("newInstagramPosts",function(){
			console.log("new instagram")
		});
	},
	setSocketSubscriptions:function(configs,callBack){
		socketIO.emit('setSocketSubscriptions', configs);
	}
}



