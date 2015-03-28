

var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var dispatcher = require("../dispatcher/dispatcher")


var eventName = "NEWINSTAGRAMPOSTS";





var InstagramStore = assign({}, EventEmitter.prototype, {
		emitChange: function () {
			this.emit(eventName);
		},

		addChangeListener: function (callback) {
			this.on(eventName, callback);
		},

		removeChangeListener: function (callback) {
			this.removeListener(eventName, callback);
		}
	}
)

InstagramStore.dispatchToken = dispatcher.register(function(action) {

	console.log(action);

});



dispatcher.dispatch({
	test : "hello world"
})


module.exports = InstagramStore;