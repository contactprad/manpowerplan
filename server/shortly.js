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
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Content-type", "application/json");
  next();
});
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
    let body =  req.body.item
    let result = LPSolver(body);
    console.log("Response is", result);
    res.status(200).send(result);

  });

module.exports = server;
