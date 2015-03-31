var io = require('socket.io-client');
var _ = require('underscore');
var empty = function(){};



var instagramIO;
var nameSpace = "/instagram"


module.exports = {
	getRecentInstagramPosts: function(tags){
		var requests = [];
		for(i = 0; i < tags.length; i++) {
			var tag = tags[i];
			requests.push($.ajax({
				url: '/instagram/recent/'+tag
			}));
		}

		$.when.apply(undefined, requests).then(function(){
			var posts = [];
			$.each(arguments,function(i,res){
				posts = posts.concat(res[0]);
			})
		});
	},
	openSocketConnection: function(){
		console.log("open connection");
		console.log(window.location.origin+nameSpace);
		instagramIO = io.connect(window.location.origin+nameSpace,{query: 'tags=abc,def'});
		instagramIO.on("connect",function(){
			console.log("connection established");
		})
	},
	openConnection: function (boardId,callBack) {
		console.log(window.location.origin+nameSpace);
		instagramIO = io.connect(window.location.origin + nameSpace, {
			multiplex : false,
			query: {boardId : boardId}
		});

		instagramIO.on('connect', function (socket) {
			if(callBack)callBack();
		});

		instagramIO.on('test', function (response) {
			console.log("test receceived")
			console.log(response)
		})

		return instagramIO;
	},
	closeConnection: function(){
		if(instagramIO)
			instagramIO.disconnect();
	}
}
