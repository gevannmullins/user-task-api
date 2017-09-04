/**
 * Call the packages we need
 */
var Users      = require('./app/models/users');
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');

/**
 * Configure our app to use bodyParser()
 * This will allow us to get the data from a POST
 */
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// set our port
var port = process.env.PORT || 8000;

/**
 * Routes for our API
 */

// get an instance of the express Router
var router = express.Router();

/**
 * Our first route is used for testing purposes.
 * We call this route by going to http://localhost:8000/api
 */
router.get('/', function(req, res) {

    // var mongo = require('mongodb');

    // var MongoClient = require('mongodb').MongoClient;
    // var url = "mongodb://localhost:27017/mydb";
    //
    // MongoClient.connect(url, function(err, db) {
    //     if (err) throw err;
    //     console.log("Database created!");
    //     db.close();
    // });


    var MongoClient = require('mongodb').MongoClient;
    var url = "mongodb://localhost:27017/mydb";

    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        db.createCollection("customers", function(err, res) {
            if (err) throw err;
            console.log("Collection created!");
            db.close();
        });
    });
    // res.json({ message: 'Awesome stuff, our API endpoint s workng!' });
});


router.get('/users', function(req, res){
    // Users.find({},function(err, user){
    //     // res.send('index',{docs:user});
    //     res.json(user);
    // });
    // // var Users = new Users();
    // // Users.find({}, function(err, Users) {
    // //     if (err)
    // //         res.send(err);
    // //     res.json(Users);
    // // });
    //
    // // res.json({message: 'working'});

    Users.find({}, function(err, users) {
        var userMap = {};

        users.forEach(function(user) {
            userMap[user._id] = user;
        });

        res.send(userMap);
    });
});

// router.post('/users', function(req, res){
//
//     var users = new Users();      // create a new instance of the Bear model
//     users.username = req.body.username;  // set the bears name (comes from the request)
//     users.first_name = req.body.first_name;
//     users.last_name = req.body.last_name;
//
//     // save the bear and check for errors
//     users.save(function(err) {
//         if (err)
//             res.send(err);
//         res.json({ message: 'User created!', userData: users});
//     });
//
// });

router.post("/users", function(req, res){
    var myUsers = new Users(req.body);
    myUsers.save(function(err){
        if (err)
            res.send(err);
        res.json({ message: 'User created!', userData: myUsers});
    });
});

//
// // more routes for our API will happen here
// router.route('/users').post(function(req, res) {
//
//     var users = new Users();      // create a new instance of the Bear model
//     users.username = req.body.username;  // set the bears name (comes from the request)
//     users.first_name = req.body.first_name;
//     users.last_name = req.body.last_name;
//
//     // save the bear and check for errors
//     users.save(function(err) {
//         if (err)
//             res.send(err);
//         res.json({ message: 'User created!', userData: users});
//     });
//
// });


// all of our routes will be prefixed with /api
app.use('/api', router);

//start up the server
app.listen(port);
console.log('Magic happens on port ' + port);
