var configs   = require('../configs');
var logger    = require('winston');
var path      = require('path');
var r         = require('rethinkdb');
var async     = require('async');

logger.level = configs.logLevel || "debug";

var connection;
var dbName = configs.db.name;

/*
 Create Database
 Create Tables USERS, BOARDS
 */
function initialize(cb){
	async.waterfall([
		function(callback) {
			r.connect({ host: 'localhost', port: configs.db.port}).then(function(conn){
				connection = conn;
				callback();
			}).error(function(err){

			});
		},
		function(callback) {
			r.dbDrop(dbName).run(connection, function(err){
				if(err)
					callback(err,'done');
				else
					callback()
			});
		},
		function(callback) {
			r.dbCreate(dbName).run(connection, function(err){
				if(err)
					callback(err,'done');
				else
					callback();

			})
		},
		function(callback){
			r.db(dbName).tableCreate('users').run(connection, function(err){
				if(err)
					callback(err,'done');
				else
					callback();
			})
		},
		function(callback){
			r.db(dbName).tableCreate('boards').run(connection, function(err){
				if(err)
					callback(err,'done');
				else
					callback(err,'done');
			})
		}
	], function (err, result) {
		if(err) {
			logger.error('Unable To Initialize DB');
			logger.error(err);
		}else{
			logger.info("DB Initialized Successfully");
			module.exports.connection = connection;
		}
		if(cb)cb.call(this,arguments);
	});
}

module.exports.initialize = initialize;
module.exports.dbName = dbName;