var io = require('socket.io-client');
var _ = require('underscore');
var empty = function(){};



var configurationIO;
var nameSpace = "/configuration"

module.exports = {
	getBoardConfigs : function (boardId,successCb,errorCb) {
		$.ajax({
			url: '/api/v1/board/'+boardId
		}).done(successCb || empty).fail(errorCb || empty);
	},
	createNewBoard: function(successCb,errorCb){
		$.ajax({
			url: "/api/v1/board/new",
			type : "POST"
		}).done(successCb || empty).fail(errorCb || empty);
	},
	saveConfiguration:function(config){
		configurationIO.emit('saveConfig', config);
	},
	listenForNewConfigs:function(callBack){
		configurationIO.on("newConfigs",callBack);
	},
	openConnection: function (boardId,callBack) {
		configurationIO = io.connect(window.location.origin + nameSpace, {
			multiplex : false,
			query: {boardId : boardId}
		});

		configurationIO.on('connect', function (socket) {
			if(callBack)callBack();
		});

		return configurationIO;
	},
	closeConnection: function(){
		if(configurationIO)
			configurationIO.disconnect();
	}
}
