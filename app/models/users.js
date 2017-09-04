// var mongoose     = require('mongoose');
// var Schema       = mongoose.Schema;
//
// var UsersSchema   = new Schema({
//     username: String,
//     first_name : String,
//     last_name : String
// });
//
// module.exports = mongoose.model('Users', UsersSchema);
//

var mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    user: "admin",
    password: "admin",
    database: "users_tasks"
});

function createUser()
{
    const employee = { name: 'Winnie', location: 'Australia' };
    con.query('INSERT INTO employees SET ?', employee, (err, res) => {
        if(err) throw err;

        console.log('Last insert ID:', res.insertId);
    });

}
//
// con.connect(function(err) {
//     if (err) throw err;
//     console.log("Connected!");
//     var sql = "CREATE TABLE IF NOT EXISTS users (id INT AUTO_INCREMENT PRIMARY KEY, username VARCHAR(255), first_name VARCHAR(255), last_name VARCHAR(255))";
//     con.query(sql, function (err, result) {
//         if (err) throw err;
//         console.log("Table users created");
//     });
//     var sql = "CREATE TABLE IF NOT EXISTS tasks (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255), description VARCHAR(255), date_time VARCHAR(255))";
//     con.query(sql, function (err, result) {
//         if (err) throw err;
//         console.log("Table tasks created");
//     });
// });