var express = require("express");
var router = express.Router();
var mongoose = require('mongoose');
var passwordHash = require('password-hash');


/* GET login page*/
router.get('/', function (req, res, next) {
    res.render('login.ejs');
});

/* Receive data of username and password */
router.post('/', function(req, res, next){
	
    var email = req.body.email;
    var password = req.body.password;

// Connect with DB, and validate information 
    var db = mongoose.createConnection('mongodb://localhost:27017/Assignment2');
    var query = { email: email };
    db.collection('users').findOne({email: email}, function(err, document) {
    	if(!document){
            res.send('<h1>You do not have an account, please register before log in.</h1>');
            res.render("register.ejs");
            return;
        }
    	
    	if(passwordHash.verify(password, document.password)) {
    		console.log("ok");
    		res.render('index.ejs', { name: document.firstname + " " + document.lastname })
    	}else{
        	res.send('<h1>Wrong password, please go back and try again</h1>');
    	}
    });

	
});

module.exports = router;