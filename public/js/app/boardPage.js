var React = require('react/addons');
window.React = React;
var Page = require('../core/PageClass');
var PageHeader = require("../components/PageHeader")

var BoardComponent = React.createClass({
	render:function(){
		return (
			<div className="board-page page">
				<div className="well container">
					<PageHeader backLink="#/"/>
					<h3 className="text-primary board-id">
						<span className="text-muted">Board ID: </span>
						<span>{this.props.boardId}</span>
					</h3>

					<a href={"#/galery/"+this.props.boardId} className="btn btn-info btn-block">View Board</a>
					<a href={"#/postToBoard/"+this.props.boardId} className="btn btn-success btn-block">Post To Board</a>
					<a href={"#/configure/"+this.props.boardId} className="btn btn-primary btn-block">Configure Board</a>
				</div>
			</div>
		);
	}
});



module.exports = Page.createPage({
	component : BoardComponent
});
