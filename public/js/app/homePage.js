var React = require('react/addons');
window.React = React;
var Page = require('../core/PageClass');


var HomeComponent = React.createClass({
  render:function(){
    return (
      <div>
        hello world
      </div> 
    );
  }
});


module.exports = Page.createPage({
  component : HomeComponent
});
