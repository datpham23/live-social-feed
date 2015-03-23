var Director = require('director');
require("expose?$!expose?jQuery!jquery");
require('../../css/global.scss');



var currentPage;

var routes = {
  '/' : function(){
    console.log("Routing To Root /")
    require.ensure([], function(){
      currentPage = require('./homePage').render();
    });
  },
  '/configuration' : function(){
    console.log("Routing To Root /")
    require.ensure([], function(){
      currentPage = require('./configuration').render();
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
