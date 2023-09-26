import express from 'express';
import bodyParser from 'body-parser';
import bcrypt from 'bcrypt-nodejs';
import cors from 'cors';
import knex from 'knex';

import Register from './Controllers/register.js';
import Signin from './Controllers/signin.js';
import Profile from './Controllers/profile.js';
import Image from './Controllers/image.js';

const db = knex({
  client: 'pg',
  connection: {
    connectionString : process.env.DATABASE_URL,
    ssl: { rejectedUnauthorized: false },
    host : 'process.env.DATABASE_HOST',
    port : 5432,
    user : 'process.env.DATABASE_USER',
    password : 'process.env.DATABASE_PW',
    database : 'process.env.DATABASE_DB'
  }
});

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {res.send('success') })-
app.post('/signin', (req, res) => { signin.handleSignin(req, res, db, bcrypt)})
app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) })
app.get('/profile/:id', (req, res) => { profile.handleProfileGet(req, res, db) })
app.put('/image', (req, res) => { image.handleImage(req, res, db) })
app.post('/imageurl', (req, res) => { image.handleApiCall(req, res, db) })

app.listen(3000, ()=> {
	console.log('app is running on port 3000');
})
