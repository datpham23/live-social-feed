var db      = require('../db/database');
var r       = require('rethinkdb');
var reheat  = require('reheat');


var connection = new reheat.Connection({
	db: 'pulsar'
});

var User = reheat.defineModel('users', {
	tableName: 'users',
	connection: connection
});


module.exports = {

	getUserById: function(id,cb){
		User.get(id).then(cb);
		//r.db(db.dbName).table('users').get(id).run(db.connection,cb);
	},
	saveUser : function(user,cb){
		r.db(db.dbName).table("users").insert(
			user,
			{conflict: "replace", returnChanges: true}
		).run(db.connection, cb);

		//new User(user).save().then(cb).catch(reheat.support.ValidationError, function (err) {
		//	console.log('valerr')
		//	console.log(err)
		//})
		//.error(function (err) {
		//	console.log(err);
		//});
	},
	updateUser : function(id,object,cb){

		//r.db(db.dbName).table("users").get(id).update(object,{
		//	returnChanges: true
		//}).run(db.connection, cb);
	}
};