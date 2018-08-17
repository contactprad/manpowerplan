const db = require('../config');
const bcrypt = require('C:/Users/kumarp/AppData/Local/Microsoft/TypeScript/2.9/node_modules/@types/bcrypt');
const saltRounds = 10;

const User = db.Model.extend({
  tableName: 'users',
  hasTimestamps: true,
  verifyPassword({password}) {
      return bcrypt.compare(password, this.get('password'));
  },
  initialize() {
    this.on('creating', (model, attrs, options) => {
      return bcrypt.hash(model.get('password'), saltRounds)
      .then((hash)=>{
        model.set('password', hash );
      });
    });
  }
});

module.exports = User;
