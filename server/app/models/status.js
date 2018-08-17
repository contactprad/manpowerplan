const db = require('../config');
//const bcrypt = require('bcrypt');
//const saltRounds = 10;

const Status = db.Model.extend({
  tableName: 'videostatus',
  hasTimestamps: true
});

module.exports = Status;
