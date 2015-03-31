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
	}
}
