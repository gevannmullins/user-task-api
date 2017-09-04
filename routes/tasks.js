var express = require('express');
var router = express.Router();
// var Task = require('../models/tasks');

// default test route
router.get('/', function (req, res) {
    return res.send({
        type: 'test',
        message: 'test works'
    })
});

// Retrieve all todos
router.get('/users/:user_id/tasks', function (req, res) {
    mc.query('SELECT * FROM tasks', function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'Tasks list.' });
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

    mc.query('SELECT * FROM tasks where id=?', task_id, function (error, results, fields) {
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

    if (!task) {
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

    var task_id = req.body.task_id;
    var task = req.body.task;

    if (!task_id || !task) {
        return res.status(400).send({ error: task, message: 'Please provide task and task_id' });
    }

    mc.query("UPDATE tasks SET task = ? WHERE id = ?", [task, task_id], function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'Task has been updated successfully.' });
    });
});

//  Delete task
router.delete('/users/:user_id/tasks', function (req, res) {

    var task_id = req.body.task_id;

    if (!task_id) {
        return res.status(400).send({ error: true, message: 'Please provide task_id' });
    }
    mc.query('DELETE FROM tasks WHERE id = ?', [task_id], function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'Task has been updated successfully.' });
    });
});

// all other requests redirect to 404
router.all("*", function (req, res, next) {
    return res.send('page not found');
    next();
});

module.exports = router;