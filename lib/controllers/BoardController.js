var path            = require('path');
var logger          = require('winston');
var server          = require('../server');
var merge           = require('merge');
var boards          = require('../dao/BoardDAO');



module.exports.initialize = function () {

	var express = server.expressApp;
	var io = server.socketIO;

	var apiVersion = "/api/v1";
	var routes = {
		getBoard : path.join(apiVersion,"board/:boardId"),
		createBoard : path.join(apiVersion,"board"),
		allBoards : path.join(apiVersion,"boards")
	}


	express.get(routes.getBoard, function(req,res){
		console.log(req.user);
		res.end();
	});

	express.post(routes.createBoard, function(req,res){
		res.send();
	});

	express.get(routes.allBoards, function(req,res){
		res.json();
	});




}
