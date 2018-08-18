var solver = require('javascript-lp-solver')

model = {
  "optimize": {
    "bacon": "max",
    "cheddar cheese": "max",
    "french fries": "max"
  },
  "constraints": {
    "carb": {
      "equal": 375
    },
    "protein": {
      "equal": 225
    },
    "fat": {
      "equal": 66.666
    }
  },
  "variables": {
    "egg white": {
      "carb": 0.0073,
      "protein": 0.109,
      "fat": 0.0017,
      "egg white": 1
    },
    "egg whole": {
      "carb": 0.0072,
      "protein": 0.1256,
      "fat": 0.0951,
      "egg whole": 1
    },
    "cheddar cheese": {
      "carb": 0.0128,
      "protein": 0.249,
      "fat": 0.3314,
      "cheddar cheese": 1
    },
    "bacon": {
      "carb": 0.00667,
      "protein": 0.116,
      "fat": 0.4504,
      "bacon": 1
    },
    "potato": {
      "carb": 0.1747,
      "protein": 0.0202,
      "fat": 0.0009,
      "potato": 1
    },
    "french fries": {
      "carb": 0.3902,
      "protein": 0.038,
      "fat": 0.1612,
      "french fries": 1
    }
  }
}

results = solver.MultiObjective(model)
console.log(results)
