var db     = require('../db/database');
var r      = require('rethinkdb');

/*
 This application doesn't have accounts, instead new users will be assigned a cookie w/ an id. This user object will store such things
 as their access tokens for instagram, twitter, vine, facebook
 */

module.exports = {
	/*
	 callBack(err,user)
	 user will be null if doesn't exists
	 */
	getUser: function(id,cb){
		console.log(id);
		r.db(db.dbName).table('users').get(id).run(db.connection,cb);
	},
	/*
	 callBack(err,status)
	 */
	createUser : function(user,cb){
		r.db(db.dbName).table("users").insert(
			user,
			{conflict: "replace", returnChanges: true}
		).run(db.connection, cb)
	},
	updateUser : function(user,cb){
		r.db(db.dbName).table("users").update(user).run(db.connection, cb)
	}
};