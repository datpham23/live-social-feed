var React = require('react/addons');
window.React = React;
var Page = require('../core/PageClass');

var FourOFourComponent = React.createClass({
	render:function(){
		return (
			<div className="four-o-four-page page">
				<div className="well container">
					<h1 className="text-danger">404</h1>
					<hr/>
					<h3 className="text-warning">Page Not Found</h3>
				</div>
			</div>
		);
	}
});



module.exports = Page.createPage({
	component : FourOFourComponent
});
