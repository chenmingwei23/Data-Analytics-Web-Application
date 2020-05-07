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


const initializePassport = require('./passport-config')
initializePassport(
  passport,
  email => users.find(user => user.email === email),
  id => users.find(user => user.id === id)
)

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
  secret: 'Assignment',
  resave: false,
  saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(methodOverride('_method'))


const users = []


//Here to login
var login = require('./routes/login');
app.use('/login', login);

//Here to register
var register = require('./routes/register');
app.use('/register', register);

app.get('/', checkAuthenticated, (req, res) => {
  res.render('index.ejs', { name: req.user.name })
})

app.post('/register', checkNotAuthenticated, async (req, res) => {
 try {
	    const hashedPassword = await bcrypt.hash(req.body.password, 10)
	    users.push({
	      id: Date.now().toString(),
	      name: req.body.name,
	      email: req.body.email,
	      password: hashedPassword
	    })
	    res.redirect('/login')
	  } catch {
	    res.redirect('/register')
	  }
})


function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next()
  }

  res.redirect('/login')
}

app.delete('/logout', (req, res) => {
	  req.logOut()
	  res.redirect('/login')
})

function checkNotAuthenticated(req, res, next) {
	  if (req.isAuthenticated()) {
	    return res.redirect('/')
	  }
	  next()
}

app.listen(3000)
