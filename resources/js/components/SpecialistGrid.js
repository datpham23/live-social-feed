var React = require('react/addons');
var SpecialistCard = require('./SpecialistCard');

require("expose?jquery-waypoints!jquery-waypoints/waypoints");



var SpecialistGrid = React.createClass({
  componentDidMount: function() {
    $('li', this.refs.grid.getDOMNode()).waypoint(
      function(){
        $(this).toggleClass('active');
        $(this).toggleClass('animate');
      },{offset:'100%'}
    );
  },
  render: function() {

    var cards = this.props.cards.map(function(card,index) {
      return <SpecialistCard card={card}/>
    })

    return (
      <ul ref="grid" className="grid effect-2">
       {cards}
      </ul>  
    );
  }
});

module.exports = SpecialistGrid;