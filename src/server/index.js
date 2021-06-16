const express = require('express');
const os = require('os');
const app = express();
const session = require('express-session');
const path = require('path');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const conn = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  port: 3306,
  database: 'whitelistapp'
});

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());


// Populates req.session
app.use(session({
  resave: false, // don't save session if unmodified
  saveUninitialized: false, // don't create session until something stored
  secret: 'kulawy rower'
}));

app.use('/api/discord', require('../api/discord'));

app.use((err, req, res, next) => {
  switch (err.message) {
    case 'NoCodeProvided':
      return res.status(400).send({
        status: 'ERROR',
        error: err.message,
      });
    default:
      return res.status(500).send({
        status: 'ERROR',
        error: err.message,
      });
  }
});


app.post('/api/sendApplication', function (req, res) {
  const post = {  
    avatar: req.body.avatar,
    name: req.body.name,
    age: req.body.age,
    steamid: req.body.steamid,
    uid: req.body.uid,
    discord: req.body.discord,
    charName: req.body.charName,
    charBirthday: req.body.charBirthday,
    history: req.body.history,
   };

  conn.query("INSERT INTO applications  SET ?", post, function (err, result) {
    if (err) throw err;
    res.send('Dodano poprawnie');
  }).on('error', function(err) {
    res.send(err);
  });
});

app.get('/api/getSession', (req, res) => {
  res.send({
    isLogged: req.session.logged,
    name: req.session.name,
    id: req.session.uId,
    avatar: req.session.avatar,
    discriminator: req.session.discriminator,
  });
});

app.get('/api/getApplication/:id',  (req, res) => {
  console.log('====req===')
  const id = req.params.id;
  console.log(id)
  conn.query("SELECT * FROM applications WHERE id=?", id, function (err, result) {
    if (err) throw err;
    
  console.log(result)
    res.send({
      data: result,
    });
  }).on('error', function(err) {
    res.send(err);
  });
});

app.get('/api/getApplications', (req, res) => {
  conn.query("SELECT * FROM applications", function (err, result) {
    if (err) throw err;
    res.send({
      data: result,
    });
  }).on('error', function(err) {
    res.send(err);
  });
});


app.get('/api/getUsername', (req, res) => res.send({ username: os.userInfo().username }));


app.listen(process.env.PORT || 8080, () => console.log(`Listening on port ${process.env.PORT || 8080}!`));



