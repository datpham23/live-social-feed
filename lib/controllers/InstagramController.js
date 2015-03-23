var path = require('path');
var Instagram = require('instagram-node-lib');
var configs = require('../configReader.js')();
var socketio = require('socket.io');
var Fiber = require('fibers');
var externalip = require('externalip');
var async = require("async");




var InstagramController = function (root, express, server) {

  
  this.ip;
  var io = socketio(server);

  //Must be done in synch
  //1. Find public ip address first
  //2. Use public ip address to set up web hook

  async.waterfall([
    function(callback){
      externalip(function (err, ip) {
        this.ip = ip;
        callback(null,ip)
      })
    }.bind(this),
    function(ip, callback){
      Instagram.set('client_id', configs.instagram.client_id);
      Instagram.set('client_secret', configs.instagram.client_secret);
      //TODO Set configuration for http protocol
      Instagram.set('callback_url', 'http://'+ip+'/callback');
      Instagram.set('redirect_uri', 'http://'+ip+'/');
      Instagram.set('maxSockets', 10);
      
      Instagram.subscriptions.list();


      Instagram.subscriptions.subscribe({
        object: 'tag',
        object_id: 'bae',
        aspect: 'media',
        callback_url: 'http://'+configs.ipAddress+'/callback',
        type: 'subscription',
        id: '#'
      });

      callback(null, 'done');
    }
  ], function (err, result) {
    if(err)
      console.log(err);
  });


  // Instagram.tags.unsubscribe({ id: 17323639,
  //   complete : function(){
  //     console.log("complete")
  //   }
  // });


  express.get(path.join(root,"callback"), function(req,res){
    var handshake =  Instagram.subscriptions.handshake(req, res);
  });


  express.post(path.join(root,"callback"), function(req, res) {
    console.log("post callback")
    var data = req.body;

    // Instagram returns a bundle object which has an id where you must make another call to get all the posts
    // Client side will make call to the following url pattern to get latests posts
    //'http://api.instagram.com/v1/tags/' + bundle.object_id + '/media/recent?client_id='+configs.instagram.client_id;
    io.emit('newInstagram', {
      newBundles : data,
      client_id : configs.instagram.client_id
    });

    res.end();
  });

  express.get(path.join(root,"instagram","subscriptions","tags"), function(req,res){
    var list = Instagram.subscriptions.list({
      complete: function (list) {
        res.json(list);
      }
    });
  });

  express.delete(path.join(root,"instagram","subscriptions","tags",":tagId"), function(req,res){
    // var list = Instagram.subscriptions.list({
    //   complete: function (list) {
    //     res.json(list);
    //   }
    // });
    res.end()
  });

  express.get(path.join(root,"instagram","recent","posts",":tag"), function(req,res){
    Instagram.tags.recent({
      name: req.params.tag,
      complete: function(posts){
        res.json(posts)
      }
    });
  });

  express.get(path.join(root,"instagram","save","tags"), function(req,res){
    console.log('saving tags')
    // Instagram.tags.recent({
    //   name: req.params.tag,
    //   complete: function(posts){
    //     res.json(posts)
    //   }
    // });
    res.end()
  });
  
};

module.exports = InstagramController;