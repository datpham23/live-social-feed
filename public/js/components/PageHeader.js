var React = require('react/addons');
window.React = React;

var PageHeader = React.createClass({
	render:function(){
		return (
			<div>
				<a href={this.props.backLink} className="btn btn-link back-button">
					<i className="mdi-navigation-chevron-left mdi-material-teal"/>
					<span>Back</span>
				</a>
				<hr className="no-margin"/>
			</div>
		);
	}
});



module.exports = PageHeader;