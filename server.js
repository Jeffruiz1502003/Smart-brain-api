const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require('./Controllers/register');
const signin  = require('./Controllers/signin');
const profile = require('./Controllers/profile');
const image = require('./Controllers/image');


// // const db = knex({
// //   client: 'pg',
// //   connection: {
// //     host : '127.0.0.1',
// //     port : 5432,
// //     user : 'postgres',
// //     password : 'Js',
// //     database : 'smart-brain'
// //   }
// });
// const db = knex({
//   client: 'pg',
//   connection: {
//     connectionString: 'postgres://mydb_ptsw_user:jvlX4QMMrgHDc5UcaonSZHmgE6HYad5M@dpg-ck8svinq54js73e8h8b0-a/mydb_ptsw',
//     // ssl: { rejectedUnauthorized: false },
//     host: 'dpg-ck8svinq54js73e8h8b0-a',
//     port: 5432,
//     user: 'mydb_ptsw_user',
//     password: 'jvlX4QMMrgHDc5UcaonSZHmgE6HYad5M',
//     database: 'mydb_ptsw': 
//   }
// });
const db = knex({
  client: 'pg',
  connection: {
    connectionString : process.env.DATABASE_URL,
    host: process.env.DATABASE_HOST,
    port: 5432,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PW,
    database: process.env.DATABASE_DB
  }
});

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => { res.send('Success') });

app.post('/signin', (req, res) => { signin.handleSignin(req, res, db, bcrypt)});

app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) });

app.get('/profile/:id', (req, res) => { profile.handleProfileGet(req, res, db) });

app.put('/image', (req, res) => { image.handleImage(req, res, db) })

app.post('/imageurl', (req, res) => { image.handleApiCall(req, res, db) });

app.listen(process.env.PORT || 3000, ()=> {
	console.log(`app is running on port ${process.env.PORT}`);
})
