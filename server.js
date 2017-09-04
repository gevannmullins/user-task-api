// include objects that we need
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

// // get an instance of the express Router
const router = express.Router();

// include our database connection
const mc = require('./db_connection_mysql');
mc.connect();

/**
 * Setting all the users routes
 */
// default test route
router.get('/', function (req, res) {
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

/**
 * Setting all the tasks routes
 */
// Retrieve all tasks for specified user
router.get('/users/:user_id/tasks', function (req, res) {

    var user_id = req.params.user_id;

    mc.query('SELECT * FROM tasks WHERE user_id = ?', user_id, function (error, results, fields) {
        if (error) throw error;
        return res.send({
            error: false,
            data: results,
            message: 'Tasks list.'
        });
    });
});

// Retrieve task with id
router.get('/users/:user_id/tasks/:task_id', function (req, res) {

    var user_id = req.params.user_id;
    var task_id = req.params.task_id;

    if (!task_id) {
        return res.status(400).send({
            error: true,
            message: 'Please provide task_id'
        });
    }

    mc.query('SELECT * FROM tasks where id = ?, user_id = ?', [task_id, user_id], function (error, results, fields) {
        if (error) throw error;
        return res.send({
            error: false,
            data: results[0],
            message: 'Tasks list.'
        });
    });

});

// Add a new task
router.post('/users/:user_id/tasks', function (req, res) {

    var user_id = req.params.user_id;
    var task_name = req.body.name;
    var task_descripton = req.body.description;
    var task_date_time = req.body.date_time;

    if (!task_name) {
        return res.status(400).send({
            error:true,
            message: 'Please provide task'
        });
    }

    mc.query("INSERT INTO tasks SET ? ",
        {
            name: task_name,
            description: task_descripton,
            date_time: task_date_time,
            user_id: user_id
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

//  Update task with id
router.put('/users/:user_id/tasks', function (req, res) {

    var user_id = req.params.user_id;
    var task_name = req.body.name;
    var task_description = req.body.description;
    var task_date_time = req.body.date_time;

    if (!user_id) {
        return res.status(400).send({
            error: user_id,
            message: 'Please provide user_id'
        });
    }

    mc.query("UPDATE tasks SET name = ?, description = ?, date_time = ?, user_id = ? WHERE id = ?",
        [task_name, task_description, task_date_time, user_id, task_id],
        function (error, results, fields) {
            if (error) throw error;
            return res.send({
                error: false,
                data: results,
                message: 'Task has been updated successfully.'
            });
    });
});

//  Delete task
router.delete('/users/:user_id/tasks/:task_id', function (req, res) {

    var task_id = req.params.task_id;

    if (!task_id) {
        return res.status(400).send({
            error: true,
            message: 'Please provide task_id'
        });
    }
    mc.query('DELETE FROM tasks WHERE id = ?', task_id, function (error, results, fields) {
        if (error) throw error;
        return res.send({
            error: false,
            data: results,
            message: 'Task has been updated successfully.'
        });
    });
});

// all other requests redirect to 404
router.all("*", function (req, res, next) {
    return res.send('page not found');
    next();
});

// all of our routes will be prefixed with /api
app.use('/api', router);

// set the port
app.listen(8000, function () {
    console.log('Node app is running on port 8000');
});
