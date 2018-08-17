const db = require('../config');
const Link = require('../models/link');

const Links = new db.Collection();

Links.model = Link;

module.exports = Links;
