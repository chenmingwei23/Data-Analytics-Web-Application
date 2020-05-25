var express = require("express");
var router = express.Router();
var mongoose = require('mongoose');
var passwordHash = require('password-hash');

/* GET login page*/
router.get('/', function (req, res, next) {
    res.render('register.ejs');
});


router.post('/', async (req, res, next) => {
    // get POST form data
	var firstname = req.body.firstname;
    var lastname = req.body.lastname;
    var email = req.body.email;
    var password = req.body.password;
    var hashedPassword = passwordHash.generate(password);
    var question = req.body.question;
    var userData = {ID:Date.now().toString(), firstname: firstname, lastname: lastname, email: email, password: hashedPassword, question:question};

    //connect DB
    var db = mongoose.createConnection('mongodb://localhost:27017/Assignment2');
    var Schema = new mongoose.Schema({
        ID: String,
    	firstname: String,
    	firstname: String,
        email: String,
        password: String,
        question: String
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
          });
        db.collection("users").insertOne(userData, function(err, result) {
            if (err) throw err;
            res.render('login.ejs');
            db.close();
         });
    })
});

module.exports = router;