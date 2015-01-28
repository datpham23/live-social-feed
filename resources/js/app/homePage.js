var React = require('react/addons');
window.React = React;
var Page = require('../core/PageClass');
var Navbar = require('../components/Navbar');
var CarouselItem = require('../components/CarouselItem');
var SpecialistGrid = require('../components/SpecialistGrid')
require("expose?jquery-waypoints!jquery-waypoints/waypoints");


var carouselItems = [
{
  videoSrc : "resources/videos/01.mp4",
  videoTitle : "VIDEOGRAPHY \u00b7 Learn in 5 Minutes",
  videoDescription : "Take Slow Motion Videos like a Pro",
  specialistSrc : "resources/img/profile_1.jpg",
  specialistName : "Session by Brittany Mehan",
  specialistDesc : "Apple Specialist, Videographer"
},
{
  videoSrc : "resources/videos/02.mp4",
  videoTitle : 'HEALTH & FITNESS \u00b7 Learn in 2 Minutes',
  videoDescription : "How to Track your Ride with Apple Watch",
  specialistSrc : "resources/img/profile_2.jpg",
  specialistName : "Session by David Craig",
  specialistDesc : "Personal Trainer"
},
{
  videoSrc : "resources/videos/03.mp4",
  videoTitle : 'PHOTOGRAPHY \u00b7 Learn in 3 Minutes',
  videoDescription : "How to Frame Landscape Photography",
  specialistSrc : "resources/img/profile_3.jpg",
  specialistName : "Session by Cole Rise",
  specialistDesc : "Apple Specialist, Writer"
}
]

var contents = [
{
  agentImg : "resources/img/sm_profile_1.jpg",
  agentName : "Mary Shadley",
  agentDescription: "Apple Specialist, Illustrator",
  videoTitle:"ART \u00b7 Learn in 3 mins ",
  videoDescription: "The Art of Sketching with iPad Air 2",
  contentImg : "resources/img/session_1.jpg"
},{
  agentImg : "resources/img/sm_profile_2.jpg",
  agentName : "Katherine Lohan",
  agentDescription: "Apple Specialist, Photographer",
  videoTitle:"PHOTOGRAPHY \u00b7 Learn in 30 secs",
  videoDescription: "Tips for Taking Stunning Macro Photos with iPhone ",
  contentImg : "resources/img/session_2.jpg"
},{
  agentImg : "resources/img/sm_profile_3.jpg",
  agentName : "Diao Lei",
  agentDescription: "Musician",
  videoTitle:"MUSIC \u00b7 Learn in 5 mins",
  videoDescription: "Sample Live Street Sounds for Your Track",
  contentImg : "resources/img/session_3.jpg"
},{
  agentImg : "resources/img/sm_profile_4.jpg",
  agentName : "Andrea Brugi",
  agentDescription: "Personal Trainer",
  videoTitle:"HEALTH & FITNESS \u00b7 Learn in 3 mins",
  videoDescription: "How to Track Your Run on Apple Watch ",
  contentImg : "resources/img/session_4.jpg"
},{
  agentImg : "resources/img/sm_profile_5.jpg",
  agentName : "Jessica Berta",
  agentDescription: "Apple Specialist, Writer",
  videoTitle:"PHOTOGRAPHY \u00b7 Learn in 5 mins",
  videoDescription: "Create a Travel Album to Share with Friends",
  contentImg : "resources/img/session_5.jpg"
},{
  agentImg : "resources/img/sm_profile_6.jpg",
  agentName : "Peter Prato",
  agentDescription: "Apple Specialist, Developer",
  videoTitle:"TIPS & TRICKS \u00b7 Learn in 60 secs",
  videoDescription: "How to Get Remote Access to your Computer",
  contentImg : "resources/img/session_6.jpg"
}
]


var HomeComponent = React.createClass({
  onWindowScroll:function(){
    if ($(window).scrollTop() > 50) {
        $('.collapse-nav').addClass('scrolled');
        $('.collapse-nav').removeClass('expand');
      } else {
        $('.collapse-nav').removeClass('scrolled');
    }
  },
  toggleNav:function(){
    $(".collapse-nav").toggleClass('expand');
  },
  componentDidMount: function() {
    $('#myCarousel').carousel({
      interval: false
    })

    $('.specialist').waypoint(
      function(){
        $(this).toggleClass('active');
        $(this).toggleClass('animate');
      },{offset:'100%'}
    );

    $(".collapse-nav .discover").click(this.toggleNav);


    $(window).bind('scroll', this.onWindowScroll);
  },
  componentWillUnmount:function(){
    $(window).unbind('scroll', this.onWindowScroll);
    $(".collapse-nav .discover").unbind('click', this.toggleNav);

  },
  render:function(){
    return (
      <div>
        <Navbar/>
        <div id="myCarousel" className="carousel slide" data-ride="carousel">
          <ol className="carousel-indicators">
            <li data-target="#myCarousel" data-slide-to="0" class="active"></li>
            <li data-target="#myCarousel" data-slide-to="1"></li>
            <li data-target="#myCarousel" data-slide-to="2"></li>
          </ol>
          <div className="carousel-inner" role="listbox">
            {
              carouselItems.map(function(item,index){
                return (<CarouselItem carousel={item} active={index == 0}/>)
              })
            }
          </div>
          <a className="left carousel-control" href="#myCarousel" role="button" data-slide="prev">
            <i className="fa fa-angle-left"></i>
          </a>
          <a className="right carousel-control" href="#myCarousel" role="button" data-slide="next">
            <i className="fa fa-angle-right"></i>
          </a>
        </div>

        <div className="container recent-sessions">
          <div className="text-center">
            <h1>Recent Sessions</h1>
          </div>
          <div className="grid-container">
           <SpecialistGrid cards={contents}/>
          </div> 
        </div>
        <div className="row specialists-container">
          <div className="container">
            <h2 className="text-center"><i className="fa fa-apple"></i> Studio Specialists</h2>
            <div className="specialists-row effect-2">
              <div className="col-md-3 text-center specialist">
                <img className="img-circle" src="resources/img/specialist_01.jpg"/>
                <div className="name">Jessica Marker</div>
                <div className="description text-muted">Apple Specialist, Writer</div>
                <div className="link"><a href="#">Jessica's Sessions</a></div>
              </div>
              <div className="col-md-3 text-center specialist">
                <img className="img-circle" src="resources/img/specialist_02.jpg"/>
                <div className="name">Francis Travis</div>
                <div className="description text-muted">Apple Specialist, Painter</div>
                <div className="link"><a href="#">Francis' Sessions</a></div>
              </div>
              <div className="col-md-3 text-center specialist">
                <img className="img-circle" src="resources/img/specialist_03.jpg"/>
                <div className="name">Jeff Johnson</div>
                <div className="description text-muted">Apple Specialist, Musician</div>
                <div className="link"><a href="#">Jeff's Sessions</a></div>
              </div>
              <div className="col-md-3 text-center specialist">
                <img className="img-circle" src="resources/img/profile_3.jpg"/>
                <div className="name">Cole Rise</div>
                <div className="description text-muted">Professional Photographer</div>
                <div className="link"><a href="#">Cole's Sessions</a></div>
              </div>
            </div>  
          </div>  
        </div> 

        <div style={{"height":"200px"}}>

        </div>
      </div> 
    );
  }
});


module.exports = Page.createPage({
  component : HomeComponent
});
