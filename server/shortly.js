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

    app.post('/manpowerplan/findoptimal1', (req, res) => {
      console.log("post: Calculate the optimal solutoin")
      let body = req.body
      console.log(body);
      let finalEquation = replaceArray(body);
      console.log("Final Equation is", finalEquation);
      let result = LPSolver(finalEquation);
      console.log("Response is", result);
      res.status(200).send(result);

    });

var replaceArray = function(body) {
  let equation = ["min: AAA1 x1 + AAA2 y1 + AAA3 a1 + AAA3 a2 + AAA3 a3 + AAA3 a4 + AAA4 b1 + AAA4 b2 + AAA4 b3 + AAA4 b4",
    "24 x1 + 24 a1 + 48 y1 + 48 b1 - d1 >= BBB1",
    "24 x1 + 24 a2 + 48 y1 + 48 b2 + d1 - d2 >= BBB2",
    "24 x1 + 24 a3 + 48 y1 + 48 b3 + d2 - d3 >= BBB3",
    "24 x1 + 24 a4 + 48 y1 + 48 b4 + d3 >= BBB4",
    "EEE1 a1 + EEE1 b1 - EEE2 x1 - EEE2 y1 >= 0",
    "EEE3 a2 + EEE3 b2 - EEE4 x1 - EEE4 y1 >= 0",
    "EEE5 a3 + EEE5 b3 - EEE6 x1 - EEE6 y1 >= 0",
    "EEE7 a4 + EEE7 b4 - EEE8 x1 - EEE8 y1 >= 0",
    "x1 >= 1",
    "y1 >= 1",
    "a1 >= 1",
    "b1 >= 1",
    "a2 >= 1",
    "b2 >= 1",
    "a3 >= 1",
    "b3 >= 1",
    "a4 >= 1",
    "b4 >= 1",
    "d1 >= -DDD1",
    "d1 <=  DDD1",
    "d2 >= -DDD2",
    "d2 <=  DDD2",
    "d3 >= -DDD3",
    "d3 <=  DDD3",
    "int x1",
    "int y1",
    "int a1",
    "int b1",
    "int a2",
    "int b2",
    "int a3",
    "int b3",
    "int a4",
    "int b4"
  ]
  let firstRow = equation[0].replaceAll("AAA1", body.salregse);
  firstRow = firstRow.replaceAll("AAA2", body.salregsse);
  firstRow = firstRow.replaceAll("AAA3", body.salconse);
  firstRow = firstRow.replaceAll("AAA4", body.salconsse);
  let finalEquation = [];

  finalEquation.push(firstRow);
  console.log(finalEquation)

  let secondRow = equation[1].replaceAll("BBB1", body.q1constraint);
  finalEquation.push(secondRow)
  let thirdRow = equation[2].replaceAll("BBB2", body.q2constraint);
  finalEquation.push(thirdRow)
  let fourthRow = equation[3].replaceAll("BBB3", body.q3constraint);
  finalEquation.push(fourthRow);
  let fifthRow = equation[4].replaceAll("BBB4", body.q4constraint);
  finalEquation.push(fifthRow);

  //Add code here to manage the contraint
  let coeff1 = parseFloat(body.q1temptotal);
  let coeff2 = 1 - coeff1;
  let six = equation[5].replaceAll("EEE1", coeff2.toString()).replaceAll("EEE2", coeff1.toString());
  finalEquation.push(six);

  coeff1 = parseFloat(body.q2temptotal);
  coeff2 = 1 - coeff1;
  let seven = equation[6].replaceAll("EEE3", coeff2.toString()).replaceAll("EEE4", coeff1.toString());
  finalEquation.push(seven);

  coeff1 = parseFloat(body.q3temptotal);
  coeff2 = 1 - coeff1;
  let eight = equation[7].replaceAll("EEE5", coeff2.toString()).replaceAll("EEE6", coeff1.toString());
  finalEquation.push(eight);

  coeff1 = parseFloat(body.q4temptotal);
  coeff2 = 1 - coeff1;
  let nine = equation[8].replaceAll("EEE7", coeff2.toString()).replaceAll("EEE8", coeff1.toString());
  finalEquation.push(nine);

  for(var i = 9; i<= 18; i++) {
    finalEquation.push(equation[i]);
  }
  let eleven = equation[19].replaceAll("DDD1", body.delta1cons);
  finalEquation.push(eleven);
  let twelve = equation[20].replaceAll("DDD1", body.delta1cons);
  finalEquation.push(twelve);
  let thirten = equation[21].replaceAll("DDD2", body.delta2cons);
  finalEquation.push(thirten);
   let fourteen = equation[22].replaceAll("DDD2", body.delta2cons);
   finalEquation.push(fourteen);
let fifteen = equation[23].replaceAll("DDD3", body.delta3cons);
finalEquation.push(fifteen);
let sixteen = equation[24].replaceAll("DDD3", body.delta3cons);
finalEquation.push(sixteen);
 for (var i = 25; i <= 34; i++) {
   finalEquation.push(equation[i]);
 }
  console.log(finalEquation);
  return finalEquation
}
String.prototype.replaceAll = function (search, replacement) {
  var target = this;
  return target.split(search).join(replacement);
};
module.exports = server;
