var db     = require('../db/database');
var r      = require('rethinkdb');


module.exports = {

	getBoardById: function(id,cb){
		r.db(db.dbName).table('boards').get(id).run(db.connection,cb);
	},
	createBoard : function(user,cb){
		r.db(db.dbName).table("boards").insert(
			user,
			{conflict: "replace", returnChanges: true}
		).run(db.connection, cb);
	},
	updateBoard : function(id,object,cb){
		r.db(db.dbName).table("boards").get(id).update(object,{
			returnChanges: true
		}).run(db.connection, cb);
	},
	getAllBoards: function(cb){
		r.db(db.dbName).table("boards").run(db.connection, cb);
	}
};