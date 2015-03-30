var React = require('react/addons');
window.React = React;
var Page = require('../core/PageClass');
var configurationAPI = require('../api/configurationAPI');
var cx = require('classnames');

//classNames('foo', { bar: true, duck: false }, 'baz', { quux: true })
//<label class="control-label" for="inputError">Input error</label>

var LandingComponent = React.createClass({
	getInitialState:function(){
		return {
			isLoading : false,
			createFailedMessage : '',
			findFailedMessage : ''
		}
	},
	onCreateBoard: function(){
		var _this = this;
		this.setState({
			isLoading : true
		})

		configurationAPI.createNewBoard(function(boardId){
			window.location.href = "#/board/" + boardId;
			},
			function(err){
				_this.setState({
					createFailedMessage : "Unable to create board: "+err.statusText
				});
			}
		)
	},
	onEnter:function(event){
			if(event.keyCode === 13){
				console.log("on enter")
				this.onFindBoard();
				event.preventDefault();
			}
	},
	onFindBoard:function(){
		var _this = this;
		var boardID = this.refs.boardID.getDOMNode().value;
		configurationAPI.getBoardConfigs(boardID, function (configs) {
			//Board exists redirect to page
			window.location.href = "#/board/" + boardID;
		},function(){
			//Board does not exists
			_this.setState({
				findFailedMessage : "Unable to find board: "
			});
		});
	},
	render:function(){
		var formClasses = cx('form-group', { 'has-success' : this.state.findFailedMessage.length == 0 },{ 'has-error' : this.state.findFailedMessage.length > 0 })

		return (
			<div className="landing-page page">
				<div className="well container">
					{
						this.state.isLoading ?

							<div className="progress progress-striped active">
								<div className="progress-bar" style={{width:"100%"}}></div>
							</div>
						: null
					}

					{
						this.state.createFailedMessage.length > 0 ?
							<h4 className="text-danger">{this.state.createFailedMessage}</h4>
						:
							null
					}
					<a href="javascript:void(0)" onClick={this.onCreateBoard} className="btn btn-info btn-block create-button">Create New Board</a>
					<hr/>

					<div className={formClasses}>
						{
							this.state.findFailedMessage.length > 0 ?
								<label className="control-label" for="inputError">{this.state.findFailedMessage}</label>
							: null
						}

						<input ref="boardID" className="form-control input-lg" type="text" placeholder="Board Id" onKeyUp={this.onEnter}/>
					</div>
					<a href="javascript:void(0)" onClick={this.onFindBoard} className="btn btn-success btn-block">Find Board</a>
				</div>
			</div>
		);
	}
});



module.exports = Page.createPage({
	component : LandingComponent
});
