// include objects that we need
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
var CronJob = require('cron').CronJob;

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
 * Some custom functions for doing some manipulations
 */
function next_pending_date(date_time_entered) {

    var date = new Date(date_time_entered);
    var newdate = new Date(date);

    newdate.setDate(newdate.getDate() + 3);

    var dd = newdate.getDate();
    var mm = newdate.getMonth() + 1;
    var yyyy = newdate.getFullYear();

    var someFormattedDate = yyyy + '-' + mm + '-' + dd + ' ' + 'H:i:s'; // current date time format "2016-05-25 14:25:00"
    return someFormattedDate;
}

function check_date_passed(date_time_entered) {
    var today, someday, pending_value;
    today = new Date();
    someday = new Date();
    someday.setFullYear(date_time_entered);

    if (someday > today) {
        pending_value = 1;
    } else {
        pending_value = 0;
    }

    return pending_value;
}

router.get('/run_cron', function (req, res) {
    mc.query('SELECT * FROM tasks', function (error, results, fields) {
        if (error) throw error;

        var index, len;
        console.log("The following is a list of tasks with dates pass due");
        for (index = 0, len = results.length; index < len; ++index) {
            var pending_value = check_date_passed(results[index]['date_time']);
            if (pending_value === 0 || pending_value === 'pending')
            {
                console.log(results[index]);

                mc.query("UPDATE tasks SET status = ? WHERE id = ?",
                    ['done',results[index]['id']],
                    function (error, results, fields) {
                        if (error) throw error;
                        return res.send({
                            error: false,
                            data: results,
                            message: 'Task has been updated successfully.'
                        });
                    });

            }
        }

    });
});
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
    var next_execute_date_time = next_pending_date(req.body.date_time);
    console.log(next_execute_date_time);

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
            next_execute_date_time: next_execute_date_time,
            pending: pending,
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
