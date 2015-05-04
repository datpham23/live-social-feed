var React = require('react/addons');
window.React = React;
var Page = require('../core/PageClass');
var configurationAPI = require('../api/configurationAPI');
var userApi = require('../api/userApi');
var classnames = require('classnames');


var LandingComponent = React.createClass({
	getInitialState:function(){
		var _this = this;
		userApi.getCurrentUser(function(user){
			console.log('user')
			_this.user = user;
			console.log(user);
			_this.setState({
				isLoading : false,
				userLoggedIn : true
			})
		},function(err){
			console.log(err);
			if(err.status === 404) {
				console.log('User not logged in');
				_this.setState({
					userLoggedIn : false,
					isLoading : false
				})
			}
		})

		return {
			isLoading : true,
			createFailedMessage : '',
			findFailedMessage : '',
			userLoggedIn : false
		}
	},
	getUserName : function(){
		if(this.user.instagram)
			return this.user.instagram.profile.username;
		else if(this.user.twitter)
			return this.user.twitter.profile.screen_name;
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
	render:function(){
		var formClasses = classnames('form-group', { 'has-success' : this.state.findFailedMessage.length == 0 },{ 'has-error' : this.state.findFailedMessage.length > 0 })

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
						this.state.userLoggedIn ?
							<h3>{"Hi "+this.getUserName()+"!"} </h3>
						:
							<h3>Sign In To Get Started</h3>
					}
					<hr/>
					{
						this.state.createFailedMessage.length > 0 ?
							<h4 className="text-danger">{this.state.createFailedMessage}</h4>
							:
							null
					}
					{
						this.state.userLoggedIn?
							<a href="javascript:void(0)" onClick={this.onCreateBoard} className="btn btn-info btn-block create-button">Create New Board</a>
						:
							<div>
								<a href="/auth/instagram?callbackURL=/#/" onClick={this.signInWithInstagram} className="btn btn-primary btn-block social-signin twitter-signin"><img src="/img/instagram.png"/> Instagram</a>
								<a href="/auth/twitter?callbackURL=/#/" onClick={this.signInWithTwitter} className="btn btn-info btn-block social-signin"><img src="/img/twitter.png"/> Twitter</a>
								<a href="#" onClick={this.signInWithFacebook} className="btn btn-warning btn-block social-signin"><img src="/img/facebook.png"/> Facebook (Under construction)</a>
							</div>
					}
				</div>
			</div>
		);
	}
});



module.exports = Page.createPage({
	component : LandingComponent
});
