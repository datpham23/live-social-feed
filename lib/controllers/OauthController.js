var path              = require('path');
var logger            = require('winston');
var configs           = require('../configs.js');
var async             = require('async');
var server            = require('../server');
var users             = require('../dao/UsersDAO');
var passport          = require('passport');
var IGStrategy        = require('passport-instagram').Strategy;
var TwitterStrategy   = require('passport-twitter').Strategy;
var FacebookStrategy  = require('passport-facebook').Strategy;
var objectAssign      = require('object-assign');



module.exports.intialize = function(){
	var app = server.expressApp;

	passport.serializeUser(function(user, next) {
		next(null, user);
	});

	passport.deserializeUser(function(obj, next) {
		next(null, obj);
	});


	/*
		On Oauth callback look for any existing user with id save instagram, token, info
	 */
	passport.use(new IGStrategy({
			clientID: configs.instagram.client_id,
			clientSecret: configs.instagram.client_secret,
			callbackURL: "http://"+server.ip+":"+configs.port+"/auth/instagram/callback",
			passReqToCallback : true
		},
		function(req, accessToken, refreshToken, profile, next) {
			logger.debug('Oauth Callback From Instagram')
			var user = req.user || {};
			var instagramAuthDetails = {
				instagram: {
					accessToken: accessToken,
					profile: profile._json.data
				}
			};

			users.saveUser(objectAssign(user,instagramAuthDetails), function (err, details){
				if(details.unchanged > 0)
					next(null,user);
				else
					next(null,details.changes[0].new_val);
			})
		}
	));


	/*
		?callbackURL
		Can give an optional request query parameter to redirect the user back to current page when sending out an Instagram OAUTH request
	  Defaults to root if none is provided.
	 */
	app.get('/auth/instagram',function(req,res,next){
		req.session.callbackURL = req.query.callbackURL;
		passport.authorize('instagram')(req, res, next);
	});

	app.get('/auth/instagram/callback',
		passport.authenticate('instagram', { failureRedirect: '/login',failureRedirect:'/' }),
		function(req, res) {
			res.redirect(req.session.callbackURL ? req.session.callbackURL : '/');
		}
	);


	passport.use(new TwitterStrategy({
			consumerKey: configs.twitter.client_id,
			consumerSecret: configs.twitter.client_secret,
			callbackURL: "http://"+server.ip+":"+configs.port+"/auth/twitter/callback",
			passReqToCallback : true
		},
		function(req,accessToken, tokenSecret, profile, next) {
			logger.debug('Oauth Callback From Twitter')
			var user = req.user || {};
			var twitterAuthDetails = {
				twitter: {
					accessToken: accessToken,
					tokenSecret : tokenSecret,
					profile: profile._json
				}
			};

			users.saveUser(objectAssign(user,twitterAuthDetails), function (err, details){
				if(details.unchanged > 0)
					next(null,user);
				else
					next(null,details.changes[0].new_val);
			})
		}
	));

	app.get('/auth/twitter', function(req,res,next){
		req.session.callbackURL = req.query.callbackURL;
		passport.authorize('twitter')(req, res, next);
	});


	/*
	 ?callbackURL
	 Can give an optional request query parameter to redirect the user back to current page when sending out an Instagram OAUTH request
	 Defaults to root if none is provided.
	 */
	app.get('/auth/twitter/callback',
		passport.authenticate('twitter', { failureRedirect: '/login' }),
		function(req, res) {
			res.redirect(req.session.callbackURL ? req.session.callbackURL : '/');
		}
	);





	app.get('/logout', function(req, res){
		req.logout();
		res.redirect('/');
	});
}

function ensureAuthenticated(req, res, next) {
	if (req.isAuthenticated()) { return next(); }
	res.redirect('/login.html')
}



