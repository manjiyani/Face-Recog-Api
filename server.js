const express = require("express");
const bcrypt = require("bcrypt-nodejs");
const cors = require("cors");

const signin = require('./controllers/signin');
const register = require('./controllers/register')
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = require('knex')({ //Connect PostgresSQL
    client: 'pg',
    connection: {
      connectionString : process.env.DATABASE_URL,
      ssl : { rejectUnauthorized : false },
      host : process.env.DATABASE_HOST,
      port : 5432,
      user : process.env.DATABASE_USER,
      password : process.env.DATABASE_PW,
      database :  process.env.DATABASE_DB
    }
  });


const app = express();

app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cors());

app.post('/signin', (req, res) => { signin.handleSignIn(req, res, db, bcrypt) });

app.post('/register', (req,res) => { register.handleRegister(req, res, db, bcrypt)});

app.get('/profile/:id', (req,res) => { profile.handleProfile(req, res, db) });

app.put('/image', (req,res) => { image.handleImage(req, res, db) });

app.post('/imageurl', (req,res) => { image.handleApiCall(req, res) });


app.listen(3001, ()=> {
    console.log("App running");
})