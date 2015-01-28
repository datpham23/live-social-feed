var React = require('react/addons');

var CarouselItem = React.createClass({
  render:function(){
    var cx = React.addons.classSet;
    var classes = cx({
      'item': true,
      'active': this.props.active
    });

    return (<div className={classes}>
      <video name="media" autoPlay loop muted>
        <source src={this.props.carousel.videoSrc} type="video/mp4"/>
      </video>
      <div className="container">
        <div className="carousel-caption">
          <h3 className="text-white no-text-shadow">{this.props.carousel.videoTitle}</h3>
          <h1 className="text-white no-text-shadow text-xxl">{this.props.carousel.videoDescription}</h1>
        </div>
        <a className="specialist-link" href={"#/specialist/profile/id"}> 
          <div className="carousel-caption user text-center">
            <img className="img-circle profile-pic" src={this.props.carousel.specialistSrc}/>
              <div className="description">
                <span className="text-white no-text-shadow name"><strong>{this.props.carousel.specialistName}</strong></span><br/>
                <span className="text-white no-text-shadow description">{this.props.carousel.specialistDesc}</span>
              </div>  
          </div>
        </a>      
      </div>
      <div className="overlay"/>
    </div>)
  }
})

module.exports = CarouselItem;