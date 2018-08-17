const express = require('express');
const http = require('http')
const util = require('./lib/utility');
const LPSolver = require('./app/models/LPSolver')
const app = express();
const partials = require('express-partials');
const bodyParser = require('body-parser');
const path = require('path');
var session = require('express-session');


const server = http.createServer(app);

app.set('views', `${__dirname}/views`);
app.set('view engine', 'ejs');
app.use(partials());
// Parse JSON (uniform resource locators)
app.use(bodyParser.json());
// Parse forms (signup/login)
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static(path.join(__dirname, '/public')));

app.get('/error',
  (req, res) => {
    return res.sendStatus(400);
  });

  app.post('/manpowerplan/findoptimal', (req,res) => {
    console.log("post: Calculate the optimal solutoin")
    let body = req.body;

    let data = {
      feasible: true,
      result: 1080000,
      bounded: true,
      brit: 24,
      yank: 20
    }
    let result = LPSolver.LPSolver(req.body);
    console.log(result)
    res.status(200).send(data);

  });

app.get('/getstatus', (req, res) => {
  console.log('get: last status from databse');
  Status.fetchAll().then((results) => {
    let data = results.toJSON();
    res.status(200).send(data);
  });
  return res.status(400);
});

module.exports = server;
