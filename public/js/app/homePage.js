var React = require('react/addons');
window.React = React;
var Page = require('../core/PageClass');
var io = require('socket.io-client');
var _ = require('underscore');
var jQBridget = require('jquery-bridget');
var Isotope = require('isotope-layout');
$.bridget( 'isotope', Isotope );
var imagesLoaded = require('imagesLoaded');



var instagramUrl = 'https://api.instagram.com/v1/tags/{tagId}/media/recent?client_id={client_id}';

var InstagramPost = React.createClass({
  render:function(){
    return (
      <div className="cell">
        <div className="media-item">
          <div className="social-media-icon instagram-icon"/>
          {
            this.props.post.mediaType == "video"?
              <video autoPlay loop muted>
                <source src={this.props.post.video} type="video/mp4"/>
              </video>
            :
              <img src={this.props.post.picture}></img>
          }
          <div className="info">
            <img className="profile" src={this.props.post.profilePictue}/>
            <div className="text">
              <div className="user-name">{this.props.post.userName}</div>
              <div className="message">{this.props.post.caption}</div>
            </div>
          </div>
        </div>  
      </div>
    );
  }
});


var HomeComponent = React.createClass({
  getInitialState: function() {
    return { 
      posts : []
    };
  },
  componentDidMount: function() {
    var _this = this;
    this.socket = io.connect(window.location.origin);
    this.socket.on('newInstagram', function (response) {
      $.each(response.newBundles, function(index, bundle) {
        var url = instagramUrl.replace(/{tagId}/,bundle.object_id).replace(/{client_id}/,response.client_id);

        $.ajax({
          url: url,
          dataType: 'jsonp',  
        }).done(function(posts){
          var d = false;
          var newPosts = [];
          $.each(posts.data,function(index, post) {
            var newPost = {
              type : "INSTAGRAM",
              mediaType : post.type,
              userName : post.user.username,
              fullName : post.user.full_name,
              profilePictue : post.user.profile_picture,
              picture :  post.images.standard_resolution.url,
              video : post.type == "video" ? post.videos.standard_resolution.url : '',
              caption : post.caption? post.caption.text : '',
              time : post.created_time     
            }
            newPosts.push(newPost);
          });
          
          var newState = _this.state.posts.concat(newPosts);
          newState = _.uniq(newState, function(post) { 
            return post.userName+post.time;
          });
          newState = _.sortBy(newState, function(post){ 
            return post.time
          }).reverse();

          if(newState.length > 100){
            newState = newState.splice(newState.length - 100);
          }
          _this.setState({
            posts : newState
          })
          _this.socket.disconnect();
        })
      });
    });

    
    this.isotope = $(this.refs.socialContainer.getDOMNode()).isotope({ 
      layoutMode: 'masonry',
      itemSelector: '.cell', 
    });

    this.refs.socialContainer.getDOMNode().focus();
    //this.imagesLoaded();

  },  
  componentDidUpdate: function(prevProps, prevState) {
    console.log("did update")
    var _this = this;

    

    imagesLoaded(this.refs.socialContainer.getDOMNode(), function() {
      _this.isotope.isotope('reloadItems')
      _this.isotope = $(_this.refs.socialContainer.getDOMNode()).isotope({ 
        layoutMode: 'masonry',
        itemSelector: '.cell', 
      });
    });
    

  },
  render:function(){
    return (
      <div className="social-container" ref="socialContainer" id="container">
        { 
          this.state.posts.map(function(post,i){
            return (
              <InstagramPost index={i} key={post.userName+post.time} post={post}/>
            )  
          })
        }
      </div> 
    );
  }
});



module.exports = Page.createPage({
  component : HomeComponent
});
