var express = require("express");
var router = express.Router();
var mongoose = require('mongoose');

/* GET login page*/
router.get('/', function (req, res, next) {
    res.render('register.ejs');
});


router.post('/', function (req, res, next) {
    // get POST form data
	console.log(req.body);
	var firstname = req.body.firstname;
    var lastname = req.body.lastname;
    var email = req.body.email;
    var password = req.body.password;
    var userData = {ID:Date.now().toString(), firstname: firstname, lastname: lastname, email: email, password: password};

    //connect DB
    var db = mongoose.createConnection('mongodb://localhost:27017/Assignment2');
    var Schema = new mongoose.Schema({
        ID: String,
    	firstname: String,
    	firstname: String,
        email: String,
        password: String
    });
    var User = db.model('user', Schema);
    
    //validate in DB, if account exit, register fail
    User.findOne({email: email}, function (err, data) {
        if(err){
            res.send(err);
        }
        if(data){
            res.send('<p>Account already exists!</p>');
            return;
        }
        //Correct, store new account in DB
        db.createCollection("users", function(err, res) {
            if (err) throw err;
            console.log("Collection created!");
          });
        db.collection("users").insertOne(userData, function(err, result) {
            if (err) throw err;
            console.log("1 document inserted");
            res.render('login.ejs');
            db.close();
         });
    })
});

module.exports = router;