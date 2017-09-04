var db = require('../db_connection_mysql');

var Task = {
    getAllTasks: function(callback) {
        return db.query("Select * from tasks", callback);
    },
    getTaskById: function(id, callback) {
        return db.query("select * from tasks where Id=?", [id], callback);
    },
    addTask: function(Task, callback) {
        return db.query("Insert into tasks values(?,?,?)", [Task.name, Task.description, Task.date_time], callback);
    },
    deleteTask: function(id, callback) {
        return db.query("delete from tasks where Id=?", [id], callback);
    },
    updateTask: function(id, Task, callback) {
        return db.query("update tasks set Title=?,Status=? where Id=?", [Task.name, Task.description, Task.date_time], callback);
    }
};

module.exports = Task;