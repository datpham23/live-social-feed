var React = require('react/addons');
var objectAssign = require('object-assign');



var Page = {
  component  : null,
  preRender : function(){
    console.log("pre render")
  },
  postRender: function(){
    console.log("post render")
  },
  tearDown : function(){
    console.log("tear down")
    console.log(this)
  },
  render: function(el){
    if(this.component == null){
      throw "Page requires react component."
    }
    
    var element = el || document.body;

    this.preRender();
    React.render(React.createElement(this.component),element)
    this.postRender();
    return this;
  }

}


var PageCreator = {
  createPage : function(newPage) {
    return objectAssign(Object.create(Page),newPage);
  }
}

module.exports = PageCreator;






