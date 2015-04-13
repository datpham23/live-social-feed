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
			var user = req.user;
			var instagramInfo = {
				instagram: {
					accessToken: accessToken,
					profile: profile._json.data
				}
			};

			if(!user) {
				logger.debug('Instagram user not found');
				users.createUser(instagramInfo, function (err,status){
					if(!err){
						logger.debug('Created New User via Instagram');
						user = status.changes[0].new_val;
					}

					next(null,user);
				})
			}else{
				users.updateUser(user.id,instagramInfo,function (err,status){
					if(!err){
						logger.debug('Updated user with Instagram info');
						user = status.changes.new_val;
					}

					next(null,user);
				})
			}

		}
	));

	app.get('/auth/instagram',passport.authorize('instagram'));

	app.get('/auth/instagram/callback',
		passport.authenticate('instagram', { failureRedirect: '/login',failureRedirect:'/' }),
		function(req, res) {
			res.redirect('/');
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
			var user = req.user;
			var twitterInfo = {
				twitter: {
					accessToken: accessToken,
					tokenSecret : tokenSecret,
					profile: profile._json
				}
			};

			if(!user) {
				logger.debug('User not found');
				users.createUser(twitterInfo, function (err,status){
					if(!err){
						logger.debug('Created New User via twitter');
						user = status.changes[0].new_val;
					}

					next(null,user);
				})
			}else{
				logger.debug('User exists');
				users.updateUser(user.id,twitterInfo,function (err,status){
					if(!err){
						logger.debug('Updated user with Twitter info');
						user = status.changes.new_val;
					}

					next(null,user);
				})
			};
		}
	));

	app.get('/auth/twitter', passport.authorize('twitter'));

	app.get('/auth/twitter/callback',
		passport.authenticate('twitter', { failureRedirect: '/login' }),
		function(req, res) {
			res.redirect('/');
		});



	app.get('/logout', function(req, res){
		req.logout();
		res.redirect('/');
	});
}

function ensureAuthenticated(req, res, next) {
	if (req.isAuthenticated()) { return next(); }
	res.redirect('/login.html')
}



