const express = require('express');
const session = require('express-session');
const mysql_session = require('express-mysql-session')(session);
const db = require('./lib/db.js');
const session_options = require('./lib/session.js');

const app = express();
const port = 1542;

const dotenv = require('dotenv');
dotenv.config();

const session_store = new mysql_session(session_options);
app.use(session({
  key: 'session_cookie_name',
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: session_store,
}));

const cors = require('cors');
app.use(cors({
  origin:'http://localhost:3000',
  credentials:true,
}));

app.use(express.json());
app.use(express.urlencoded({extended : false }));

const main = require('./router/main');
const schedule = require('./router/schedule');
const auth = require('./router/auth/auth');


app.get('/', (req, res) => {
  db.query('SELECT * FROM user_logindata WHERE id = 1', (error, data, fields) => {
    if (error) throw error;

    console.log('connected with DB');
    console.log('test query : ', data);
  });

  res.redirect('/main');
});

app.use('/api/main', main);
app.use('/api/auth', auth);


app.listen(port, () => {
  console.log(`api server started on localhost:${port}`);
});