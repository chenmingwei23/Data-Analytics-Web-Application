if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const mongo = require('mongodb').MongoClient
const express = require('express')
const passport = require('passport')
const flash = require('express-flash')
const session = require('express-session')
const methodOverride = require('method-override')
const cookieParser = require('cookie-parser')
var path = require('path');


const app = express()
const bcrypt = require('bcrypt')

app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: false }))
app.set('views', path.join(__dirname,'/views'));
app.use(express.static(path.join(__dirname, '/public')));
app.use(express.urlencoded({ extended: false }))
app.use(flash())
app.use(cookieParser());
app.use(session({
  secret: 'Assignment2',
  resave: false,
  saveUninitialized: false
}))
app.use(methodOverride('_method'))


const users = []


//Here to login
var login = require('./routes/login');
app.use('/login', login);

//Here to register
var register = require('./routes/register');
app.use('/register', register);

var spa = require('./routes/SPA');
app.use('/SPA', spa);

app.delete('/logout', (req, res) => {
	  req.logOut()
	  res.redirect('/login')
})
app.get('/', function (req, res) {
    res.render('start.ejs');
});

app.listen(3000)
