var io = require('socket.io-client');
var _ = require('underscore');
var empty = function(){};



var instagramIO;
var apiVersion = "/api/v1/instagram"
var urls = {
	getRecentTag : apiVersion+"/recent/{tag}"
}



module.exports = {
	getRecentInstagramPosts: function(tags){
		var requests = [];
		for(i = 0; i < tags.length; i++) {
			var tag = tags[i];
			requests.push($.ajax({
				url: getRecentTag.reaplace(/tag/,tag)
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
