var Director = require('director');
require("expose?$!expose?jQuery!jquery");
require('../../css/global.scss');
//require('../stores/InstagramStore');
var api = require("../api/instagramAPI");
var cAPi = require("../api/configurationAPI");



var currentPage;

var routes = {
  '/' : function(){
    require.ensure([], function(){
      currentPage = require('./landingPage').render();
    });
  },
  '/board/:boardId' : function(boardId){
    require.ensure([], function(){
      currentPage = require('./boardPage').render(null,{boardId: boardId});
    });
  },
  '/gallery/:boardId' : function(boardId){
    require.ensure([], function(){
      currentPage = require('./galleryPage').render(null,{boardId: boardId});
    });
  },
  '/configure/:boardId' : function(boardId){
    require.ensure([], function(){
      currentPage = require('./configurationPage').render(null,{boardId: boardId});
    });
  }
};

window.router = Director.Router(routes).configure({
  'notfound' : function(){
    console.log("Route not found");
    require.ensure([], function(){
      currentPage = require('./404').render();
    });
  },
  before : function(){
    if(currentPage != null){
      currentPage.tearDown();
    }
  }
});


router.init('/');
