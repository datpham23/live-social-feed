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




//this.socket = io.connect(window.location.origin);
//this.socket.on('newInstagramPosts', function (response) {
//	$.each(response.newBundles, function(index, bundle) {
//		var url = instagramUrl.replace(/{tagId}/,bundle.object_id).replace(/{client_id}/,response.client_id);
//
//		$.ajax({
//			url: url,
//			dataType: 'jsonp',
//		}).done(function(posts){
//			var d = false;
//			var newPosts = [];
//			$.each(posts.data,function(index, post) {
//				var newPost = {
//					type : "INSTAGRAM",
//					mediaType : post.type,
//					userName : post.user.username,
//					fullName : post.user.full_name,
//					profilePictue : post.user.profile_picture,
//					picture :  post.images.standard_resolution.url,
//					video : post.type == "video" ? post.videos.standard_resolution.url : '',
//					caption : post.caption? post.caption.text : '',
//					time : post.created_time
//				}
//				newPosts.push(newPost);
//			});
//
//			var newState = _this.state.posts.concat(newPosts);
//			newState = _.uniq(newState, function(post) {
//				return post.userName+post.time;
//			});
//			newState = _.sortBy(newState, function(post){
//				return post.time
//			}).reverse();
//
//			if(newState.length > 100){
//				newState = newState.splice(newState.length - 100);
//			}
//			_this.setState({
//				posts : newState
//			})
//			//_this.socket.disconnect();
//		})
//	});
//});