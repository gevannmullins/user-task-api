// include objects that we need
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
//
// // // get an instance of the express Router
const router = express.Router();
//
// // include our database connection
// const mc = require('../db_connection_mysql');
// mc.connect();

// default test route
router.get('/test', function (req, res) {
    return res.send({
        type: 'test',
        message: 'test works'
    })
});


// Retrieve all users
router.get('/users', function (req, res) {
    mc.query('SELECT * FROM users', function (error, results, fields) {
        if (error) throw error;
        return res.send({
            error: false,
            data: results,
            message: 'Users list.'
        });
    });
});

// Retrieve user with id
router.get('/users/:user_id', function (req, res) {

    var user_id = req.params.user_id;
    if (!user_id) {
        return res.status(400).send({
            error: true,
            message: 'Please provide user_id'
        });
    }

    mc.query('SELECT * FROM users where id=?', user_id, function (error, results, fields) {
        if (error) throw error;
        return res.send({
            error: false,
            data: results[0],
            message: 'Users list.'
        });
    });

});

// Add a new user
router.post('/users', function (req, res) {

    var user_username = req.body.username;
    var user_first_name = req.body.first_name;
    var user_last_name = req.body.last_name;

    if (!user_username) {
        return res.status(400).send({
            error:true,
            message: 'Please provide user'
        });
    }

    mc.query("INSERT INTO users SET ? ",
        {
            username: user_username,
            first_name: user_first_name,
            last_name: user_last_name
        },
        function (error, results, fields) {
            if (error) throw error;
            return res.send({
                error: false,
                data: results,
                message: 'New task has been created successfully.'
            });
        });
});

//  Update user with id
router.put('/users/:user_id', function (req, res) {

    var user_id = req.params.user_id;
    var user_username = req.body.username;
    var user_first_name = req.body.first_name;
    var user_last_name = req.body.last_name;

    if (!user_id) {
        return res.status(400).send({
            error: user_id,
            message: 'Please provide user_id'
        });
    }

    mc.query("UPDATE users SET username = ?, first_name = ?, last_name = ? WHERE id = ?", [user_username, user_first_name, user_last_name, user_id], function (error, results, fields) {
        if (error) throw error;
        return res.send({
            error: false,
            data: results,
            message: 'User has been updated successfully.'
        });
    });
});

//  Delete user
router.delete('/users/:user_id', function (req, res) {

    var user_id = req.params.user_id;

    if (!user_id) {
        return res.status(400).send({
            error: true,
            message: 'Please provide task_id'
        });
    }
    mc.query('DELETE FROM users WHERE id = ?', [user_id], function (error, results, fields) {
        if (error) throw error;
        return res.send({
            error: false,
            data: results,
            message: 'Task has been updated successfully.'
        });
    });
});


module.exports = router;