var path = require('path');
var Instagram = require('instagram-node-lib');
var configs = require('../configReader.js')();
var request = require('request');
var Sync = require('sync');
var io = require('socket.io');

var InstagramController = function (root, express, websocket,server) {
 

  io.listen(express);

  Instagram.set('client_id', configs.instagram.client_id);
  Instagram.set('client_secret', configs.instagram.client_secret);
  Instagram.set('callback_url', 'http://'+configs.ipAddress+'/callback');
  Instagram.set('redirect_uri', 'http://'+configs.ipAddress+'/');
  Instagram.set('maxSockets', 10);



  Instagram.subscriptions.list();


  // websocket.installHandlers(server, {prefix:path.join(root,'/instagram/newposts')});
  // websocket.on('connection', function(conn) {
  //     this.conn = conn;
  //     conn.on('data', function(message) {
  //         conn.write(message);
  //         console.log(message)
  //     });
  // });


  // console.log(conn)



  var response = Instagram.subscriptions.subscribe({
    object: 'tag',
    object_id: 'bae',
    aspect: 'media',
    callback_url: 'http://'+configs.ipAddress+'/callback',
    type: 'subscription',
    id: '#'
  });


  express.get(path.join(root,"callback"), function(req,res){
    console.log("handshake callback")
    var handshake =  Instagram.subscriptions.handshake(req, res);
    console.log(handshake)
  });


  express.post(path.join(root,"callback"), function(req, res) {
    var _this = this;
    console.log("post callback")
    var data = req.body;

    // Grab the hashtag "tag.object_id"
    // concatenate to the url and send as a argument to the client side
    data.forEach(function(tag) {
      console.log(tag);
      var url = 'https://api.instagram.com/v1/tags/' + tag.object_id + '/media/recent?client_id='+configs.instagram.client_id;
      io.write(url);
    });
    res.end();
  });

  express.get(path.join(root,"subscriptions"), function(req,res){

    var list = Instagram.subscriptions.list();
    console.log(list);
    res.json(list);
  });
  
};

module.exports = InstagramController;