var db = require('../db_connection_mysql');

var User = {
    getAllUsers: function(callback) {
        return db.query("Select * from users", callback);
    },
    getUserById: function(id, callback) {
        return db.query("select * from users where Id=?", [id], callback);
    },
    addUser: function(User, callback) {
        return db.query("Insert into users values(?,?,?)", [User.username, User.first_name, User.last_name], callback);
    },
    deleteUser: function(id, callback) {
        return db.query("delete from users where Id=?", [id], callback);
    },
    updateUser: function(id, User, callback) {
        return db.query("update users set Title=?,Status=? where Id=?", [User.username, User.first_name, User.last_name], callback);
    }
};

module.exports = User;