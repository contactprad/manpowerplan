const db = require('../config');
const Click = require('./click');
const crypto = require('crypto');

const Link = db.Model.extend({
  tableName: 'urls',
  hasTimestamps: true,
  defaults: {
    visits: 0,
  },
  clicks () {
    return this.hasMany(Click);
  },
  initialize () {
    this.on('creating', (model, attrs, options) => {
      const shasum = crypto.createHash('sha1');
      shasum.update(model.get('url'));
      model.set('code', shasum.digest('hex').slice(0, 5));
    });
  },
});

module.exports = Link;
