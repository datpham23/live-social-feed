var React = require('react/addons');
window.React = React;
var Page = require('../core/PageClass');
var TaggedInput = require('react-tagged-input');
var configurationAPI = require('../api/configurationAPI');
var socketManager = require('../api/socketManager');
var PageHeader = require("../components/PageHeader")


var ConfigurationComponent = React.createClass({
  getInitialState: function() {
    var _this = this;
    configurationAPI.getBoardConfigs(this.props.boardId,function(configs){

      _this.onReceivedConfigs(configs);
      _this.initialization();

    },function(error){
      _this.setState({errorMessage : error.responseText});
    });
    return {
      connectionOpened : false,
      configs : {
        instagramTags : [],
        twitterTags : [],
        facebookTags : []
      },
      errorMessage : ''
    };
  },
  initialization:function(){
    var _this = this;
    socketManager.openConnection(this.props.boardId,function(){
      console.log("connection opened");
      _this.setState({
        connectionOpened : true
      })

      socketManager.listenForNewConfigs(_this.onReceivedConfigs);
    },function(){
      //_this.setState({
      //  connectionOpened : false
      //})
    })
  },
  componentWillUnmount:function(){
    socketManager.closeConnection();
  },
  onReceivedConfigs:function(configs){
    this.setState({
      configs : $.extend(this.state.configs,configs)
    });
  },
  onTagUpdate:function(){
    socketManager.saveConfiguration(this.state.configs);
  },
  render:function(){
    return (
      <div className="configuration-page page">
        <div className="container well">
          <PageHeader backLink={"#/board/"+this.props.boardId}/>
          <div className="connection-indicator">
            {
              this.state.connectionOpened?
                <i className="mdi-device-signal-cellular-4-bar mdi-material-teal"></i>
              :
                <span className="text-danger">No Connection To Server <i className="mdi-device-signal-cellular-connected-no-internet-0-bar  mdi-material-red"></i> </span>
            }
          </div>
          {
            this.state.errorMessage.length > 0?
              <h3 className="text-danger">{this.state.errorMessage}</h3>
            :
            <div>
              <div className="config-group">
                <img className="social-icon" src="/img/instagram.png"/>
                <TaggedInput
                  ref="instagramTags"
                  autofocus={true}
                  backspaceDeletesWord={true}
                  placeholder={'Instagram Hashtags'}
                  tags={this.state.configs.instagramTags}
                  onAddTag={this.onTagUpdate}
                  onRemoveTag={this.onTagUpdate}
                  tagOnBlur={false}
                  clickTagToEdit={true}
                  unique={true}
                  classes={'tagger'}
                  removeTagLabel={"\u2715"}/>
              </div>

              <div className="config-group">
                <img className="social-icon" src="/img/twitter.png"/>
                <TaggedInput
                  ref="twitterTags"
                  autofocus={true}
                  backspaceDeletesWord={true}
                  placeholder={'Under construction'}
                  tags={[]}
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
                  removeTagLabel={"\u2715"}/>
              </div>

              <div className="config-group">
                <img className="social-icon" src="/img/facebook.png"/>
                <TaggedInput
                  ref="facebookTags"
                  autofocus={true}
                  backspaceDeletesWord={true}
                  placeholder={'Under construction'}
                  tags={[]}
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
                  removeTagLabel={"\u2715"}/>
              </div>

              <div className="config-group">
                <img className="social-icon" src="/img/vine.png"/>
                <TaggedInput
                  ref="vineTags"
                  autofocus={true}
                  backspaceDeletesWord={true}
                  placeholder={'Under construction'}
                  tags={[]}
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
                  removeTagLabel={"\u2715"}/>
              </div>
            </div>
          }
        </div>
      </div> 
    );
  }
});



module.exports = Page.createPage({
  component : ConfigurationComponent
});
