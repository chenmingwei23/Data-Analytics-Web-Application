if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const mongo = require('mongodb').MongoClient
const client = require('socket.io').listen(4000).sockets
const express = require('express')
const passport = require('passport')
const flash = require('express-flash')
const session = require('express-session')
const methodOverride = require('method-override')
const cookieParser = require('cookie-parser')


const initializePassport = require('./passport-config')
initializePassport(
  passport,
  email => users.find(user => user.email === email),
  id => users.find(user => user.id === id)
)

const app = express()
app.use(express.urlencoded({ extended: false }))
app.set('view-engine', 'ejs')
const bcrypt = require('bcrypt')
 app.set('view-engine', 'ejs')
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


app.post('/login', checkNotAuthenticated, passport.authenticate('local', {
	  successRedirect: '/',
	  failureRedirect: '/login',
	  failureFlash: true
}))
	
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
	  console.log(users)
})

app.get('/login', checkNotAuthenticated, (req, res) => {
  res.render('login.ejs')
})

app.get('/register', checkNotAuthenticated, (req, res) => {
  res.render('register.ejs')
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
