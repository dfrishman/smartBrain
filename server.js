const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
var knex = require('knex');

const register = require('./controllers/register')
const signin = require('./controllers/signin')
const profile = require('./controllers/profile')
const image = require('./controllers/image')

const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'danielfrishman',
    password : '',
    database : 'facer'
  }
});
const app = express();

app.use(bodyParser.json());
app.use(cors())
// db.select('*').from('users')
//     .then(response=> {
//       return response[0]}
//       )

app.get('/', (req, res)=>{res.send("it is working fool!")})
app.post('/signin', (req, res) => {signin.handleSignin(req, res, db, bcrypt)})
app.post('/register', (req, res) => {register.handleRegister(req, res, db, bcrypt)})
//dependency injection
app.get('/profile/:id', (req, res) => {profile.handleProfileGet(req, res, db, bcrypt)})
app.put('/image', (req, res) => { image.handleImage(req, res, db)})
app.post('/imageurl', (req, res) => { image.handleApiCall(req,res)})	

app.listen(process.env.PORT || 3000, ()=> {
	console.log(`app is running port ${process.env.PORT}`)

})