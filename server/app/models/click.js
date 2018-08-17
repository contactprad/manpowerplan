const db = require('../config');
const Link = require('./link');

const Click = db.Model.extend({
  tableName: 'clicks',
  hasTimestamps: true,
  link () {
    return this.belongsTo(Link, 'linkId');
  },
});

module.exports = Click;
