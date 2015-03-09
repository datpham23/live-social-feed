var Director = require('director');

require('../../css/site.min.css');
require('../../css/global.scss');

var currentPage;

var routes = {
  '/' : function(){
    console.log("Routing To Root /")
    require.ensure([], function(){
      currentPage = require('./homePage').render();
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
