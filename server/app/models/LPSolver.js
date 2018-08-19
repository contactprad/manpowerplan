var solver = require("javascript-lp-solver/src/main")

var LPSolver = function(model) {
  let my_arr = createArray(model)
    model = solver.ReformatLP(my_arr)
    return solver.Solve(model);
}

var createArray = function(model) {
  console.log(model);
  var temp_arr = model.split(",")
 // console.log(model.split(","));
  let my_arr = []
for(var i =0; i< temp_arr.length; i++)
{
 my_arr.push(temp_arr[i]);
}
console.log(my_arr);
return my_arr
}
/*class LPSolver {
  constructor(model) {
    this.model = model;
  }
  solveLPU() {
    return solver.Solve(this.model);
  }

  solveLPUMultiPeriod() {

  }
}*/

module.exports = LPSolver
  /*model = {
    "optimize": "capacity",
    "opType": "max",
    "constraints": {
      "plane": { "max": 44 },
      "person": { "max": 512 },
      "cost": { "max": 300000 }
    },
    "variables": {
      "brit": {
        "capacity": 20000,
        "plane": 1,
        "person": 8,
        "cost": 5000
      },
      "yank": {
        "capacity": 30000,
        "plane": 1,
        "person": 16,
        "cost": 9000
      }
    },
  };

  results = solver.Solve(model);
  console.log(results);*/

