var Director = require('director');

require('expose?bootstrap!bootstrap');
require('bootstrap/dist/css/bootstrap.min.css');
require('../../css/font-awesome.min.css');
require('../../css/base-stack.css');
require('../../css/animate.css');
require('../../css/studio.css');

var currentPage;

var routes = {
  '/' : function(){
    console.log("Routing To Root /")
    require.ensure([], function(){
      currentPage = require('./homePage').render();
    });
  },
  '/specialist/profile/:id' : function(id){
    console.log("Routing To Root /specialist/profile/"+id)
    require.ensure([], function(){
      currentPage = require('./specialistPage').render();
    });
  }
};

window.router = Director.Router(routes).configure({
  'notfound' : function(){
    console.log("Route not found");
  },
  before : function(){
    if(currentPage != null){
      currentPage.tearDown();
    }
      
  }
});


router.init('/');
