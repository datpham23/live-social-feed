var React = require('react/addons');
window.React = React;
var Page = require('../core/PageClass');
var TaggedInput = require('react-tagged-input');
var _ = require('underscore');

var ConfigurationComponent = React.createClass({
  getInitialState: function() {
    
    this.getInstagramTags();
    return { 
      twitterConfigurationReady : false,
      instagramTags: [],
      twitterTags: []
    };
  },
  getInstagramTags: function(){
    var _this = this;
    $.ajax({
      url: '/instagram/subscriptions/tags',
    })
    .done(function(tags) {
      console.log("done")
      _this.setState({
        twitterConfigurationReady : true,
        instagramTags : tags
      })
    })
    .fail(function(e) {
      console.log("Unable to get instagram configurations");
    })
  },
  saveInstagramHashTags:function(){
    console.log(this.refs.twitterTags.getTags());
  },
  render:function(){
    return (
      <div className="configruation-page">
        <div className="container">
            <h2>Configuration</h2>
            <div className="header">
              Instagram hashtags
            </div>
            { this.state.twitterConfigurationReady ?
                
                <TaggedInput
                  ref="twitterTags"
                  autofocus={true} 
                  backspaceDeletesWord={true} 
                  placeholder={''}
                  tags={_.pluck(this.state.instagramTags,"object_id")} 
                  onAddTag={function(tag){
                    console.log("add tag")
                  }}
                  onRemoveTag={function(){
                    console.log("remove")
                  }}
                  tagOnBlur={false}          
                  clickTagToEdit={false}      
                  unique={true}
                  classes={'tagger'}
                  removeTagLabel={"\u2715"} 
                />
              : <div className="spinner"></div>
            }
         
        </div>
      </div> 
    );
  }
});



module.exports = Page.createPage({
  component : ConfigurationComponent
});
