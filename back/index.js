const express = require('express');
const db = require('./lib/db.js');

const app = express();
const port = 1542;

const cors = require('cors');
app.use(cors());

const main = require('./router/main');
const schedule = require('./router/schedule');
const auth = require('./router/auth/auth');



app.get('/', (req, res) => {
  db.query('SELECT * FROM user_logindata WHERE id = 1', (error, data, fields) => {
    if (error) throw error;

    console.log('connected with DB');
    console.log('test query : ', data);
    res.send(data);
  });
});


app.use('/api/main', main);


app.listen(port, () => {
  console.log(`api server started on localhost:${port}`);
});