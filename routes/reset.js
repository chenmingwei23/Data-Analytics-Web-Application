var express = require("express");
var router = express.Router();
var mongoose = require('mongoose');
var passwordHash = require('password-hash');


router.post('/', function(req, res, next){
	res.render('start.ejs');
});


module.exports = router;