var React = require('react/addons');
window.React = React;
var Page = require('../core/PageClass');
var Masonry = require('masonry');
window.$ = require('jquery');
window.jquery = window.$;


var HomeComponent = React.createClass({
  getInitialState: function() {
    
    // return {
    //   : 
    // };
  },
  componentDidMount: function() {
    // var masonryContainer = this.refs.masonryContainer.getDOMNode()
    // var msnry = new Masonry(masonryContainer, {
    
    //   gutter : 1,
    //   itemSelector: '.item'
    // });
  },  
  render:function(){
    return (
      <div>
        hell world
      </div> 
    );
  }
});


module.exports = Page.createPage({
  component : HomeComponent
});
