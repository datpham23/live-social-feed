var React = require('react/addons');
window.React = React;

var Navbar = require('../components/Navbar');
var Page = require('../core/PageClass');


require('../../css/specialistPage.css');


var SpecialistProfile = React.createClass({
  componentDidMount: function() {
    $('body').addClass('blue-blackgound');
  },
  componentWillUnmount: function() {
    $('body').removeClass('blue-blackgound');
  },
  render:function(){
    return (
      <div className="specialist-page specialist-profile">
        <Navbar/>
        <div className="container">
          <div className="row specialist-banner fade-in">
            <div className="col-md-12 text-center">
                <img className="img-circle main-profile" src="resources/img/profile_1.jpg"/>
                <div className="specialist-name">Brittany Mehan</div>
                <div className="specialist-description">Apple Specialist, Videographer</div>
            </div>
            <div className="row specialist-meta text-center">
              <div className="col-md-4">
                <div className="meta-description">
                  Followers 
                </div>
                <br/>
                <div className="meta-value">
                  600
                </div>  
              </div>
              <div className="col-md-4 border">
                <div className="meta-description">
                  Following 
                </div>
                <br/>
                <div className="meta-value">
                  123
                </div>   
              </div>
              <div className="col-md-4">
                <div className="meta-description">
                  Sessions 
                </div>
                <br/>
                <div className="meta-value">
                  455
                </div>   
              </div>
            </div>
          </div>  
        </div>  
      </div>
    );
  }
});


module.exports = Page.createPage({
  component : SpecialistProfile
});