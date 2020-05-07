var express = require("express");
var router = express.Router();
var mongoose = require('mongoose');

/* GET login page*/
router.get('/', function (req, res, next) {
    res.render('login.ejs');
});

/* Receive data of username and password */
router.post('/', function (req, res, next) {
	console.log(req.body);
    var email = req.body.email;
    var password = req.body.password;

// Connect with DB, and validate information 
    var db = mongoose.createConnection('mongodb://localhost:27017/Assignment2');
    var query = { email: email };
    db.collection('users').findOne({email: email}, function(err, document) {
    	if(document.password == password) {
    		console.log("ok");
    		res.render('index.ejs', { name: document.name })
    	}
    });
});

module.exports = router;