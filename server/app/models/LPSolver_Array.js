var solver = require("javascript-lp-solver/src/main")


let model = [
  "min: 400 table 450 dresser",
  "1 table 1 dresser <= 60",
  "1 table <= 40",
  "1 dresser/1 table >= 0.2",
  "int table",
  "int dresser",
];

let model1 = [
  "min: 80000 x1  24000 a1  144000 y1  43200 b1 24000 a2 24000 a3 24000 a4 43200 b2 43200 b3 43200 b4",
  "24 x1 +  24 a1 + 48 y1 + 48 b1 - d1 >= 1000",
  "24 x1  24 a2  48 y1  48 b2 + d1 - d2 >= 1000",
  "24 x1  24 a3  48 y1  48 b3 + d2 - d3 >= 1000",
  "24 x1  24 a4  48 y1  48 b4 + d3 -d4 >= 1000",
  "(a1 + b1)/(a1 + b1 + x1 + y1) >=0.2",
  "a2 b2/a2 b2 x1 y1 >= 0.2",
  "a3 b3/a3 b3 x1 y1 >= 0.2",
  "a4 b4/a4 b4 x1 y1 >= 0.2",
  "x1 >= 1",
  "x2 >= 1",
  "a1 >= 1",
  "b1 >= 1",
  "a2 >= 1",
  "b2 >= 1",
  "a3 >= 1",
  "b4 >= 1",
  "d1 >= -100",
  "d1 <= 100",
  "d2 >= -100",
  "d2 <=  100",
  "d3 >= -100",
  "d3 <=100",
  "d4 >= -100",
  "d4 <=100",
  "int x1",
  "int y1",
  "int a1",
  "int b1",
  "int a2",
  "int b2",
  "int a3",
  "int b3",
  "int a4",
  "int b4",

]
        // Reformat to JSON model
  // model = solver.ReformatLP(model);
  // console.log(model);
  // results = solver.Solve(model);
  // console.log(results);

  model1 = solver.ReformatLP(model1);
  console.log(model1)
  results = solver.Solve(model1);
  console.log(results);
