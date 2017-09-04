const mysql = require('mysql');

// connection configurations
const mc = mysql.createConnection({
    host: 'localhost',
    user: 'admin',
    password: 'admin',
    database: 'users_tasks'
});

module.exports = mc;