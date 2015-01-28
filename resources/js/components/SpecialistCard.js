var React = require('react/addons');

var SpecialistCard = React.createClass({
  getInitialState: function() {
    return {liked: false};
  },
  onLike:function() {
    this.setState({
      liked : !this.state.liked
    })
  },
  onInfoClick:function(){
  },
  onImageClick:function(){
  },
  render:function(){
    var _this = this;
    var cx = React.addons.classSet;
    var classes = cx({
      'fa': true,
      'fa-heart-o' : !_this.state.liked,
      'fa-heart' : _this.state.liked,
    });
    return (
      <li>
        <div className="card">
          <img className="content-image" src={this.props.card.contentImg} onClick={this.onImageClick} />  
          <a href={"#/specialist/profile/id"}> 
            <div className="info-container" onClick={this.onInfoClick}>
              <img className="img-circle pull-left specialist-img" src={this.props.card.agentImg}/>
              <div className="name">{this.props.card.agentName}</div>
              <div className="description text-muted">{this.props.card.agentDescription}</div>
              <div className="gradient-overlay"></div>  
            </div>
          </a>  
          <div className="video-description">
            <div className="category text-white">{this.props.card.videoTitle}</div> 
            <div className="description text-white">{this.props.card.videoDescription}</div> 
          </div>
        </div>
      </li>
    );
  }
});

module.exports = SpecialistCard;