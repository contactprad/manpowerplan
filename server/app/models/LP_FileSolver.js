var fs = require("fs"),
  solver = require("javascript-lp-solver/src/solver"),
  model = {};

// Read Data from File
fs.readFile("./lp.txt", "utf8", function (e, d) {
  // Convert the File Data to a JSON Model
  model = solver.ReformatLP(d);
  console.log('model is', model);
});

// Solve the LP
console.log(solver.Solve(model));
