const mongo = require('mongodb').MongoClient
const client = require('socket.io').listen(4000).sockets
const express = require('express')
const passport = require('passport')
const flash = require('express-flash')
const session = require('express-session')

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
 
const users = []
mongo.connect('mongodb://localhost/login',function(err,db){
  if(err) throw err;

  console.log("connected to the database");
  
  client.on('connection', function(socket){
    let login = db.collection('login');
    socket.on('submit',function(data){
    	
    })
  })
});

app.post('/register',async(req, res) => {
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

app.get('/login', (req, res) => {
  res.render("login.ejs")
})

app.get('/register', (req, res) => {
  res.render("register.ejs")
})

app.listen(3000)
