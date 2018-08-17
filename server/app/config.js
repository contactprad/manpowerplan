const path = require('path');
const knex = require('C:/Users/kumarp/AppData/Local/Microsoft/TypeScript/2.9/node_modules/@types/knex')({
  client: 'sqlite3',
  connection: {
    filename: path.join(__dirname, '../db/shortly.sqlite'),
  },
  useNullAsDefault: true,
});
const db = require('C:/Users/kumarp/AppData/Local/Microsoft/TypeScript/2.9/node_modules/@types/bookshelf')(knex);

db.knex.schema.hasTable('videostatus').then((exists)=> {
if(!exists) {
  db.knex.schema.createTable('videostatus', (table) => {
    table.increments('id').primary();
    table.string('datetime', 255);
    table.integer('in');
    table.integer('since');
    table.integer('alert');
    table.boolean('active', 100);
    table.timestamps();
}).then(()=> {
  console.log('videostatus table created');
}).catch(() => {
  console.log('Error creating videostatus table');
});
}
});
// Knex has a .createTableIfNotExists method, which we do not
// recommend using unless its implementation changes.
// See https://github.com/tgriesser/knex/issues/1303 for details.
db.knex.schema.hasTable('urls').then((exists) => {
  if (!exists) {
    db.knex.schema.createTable('urls', (table) => {
      table.increments('id').primary();
      table.string('url', 255);
      table.string('baseUrl', 255);
      table.string('code', 100);
      table.string('title', 255);
      table.integer('visits');
      table.timestamps();
    }).then(() => {
      console.log('Created urls table');
    }).catch((err) => {
      console.error('Error creating urls table', err);
    });
  }
});

db.knex.schema.hasTable('clicks').then((exists) => {
  if (!exists) {
    db.knex.schema.createTable('clicks', (table) => {
      table.increments('id').primary();
      table.integer('linkId');
      table.timestamps();
    }).then(() => {
      console.log('Created clicks table');
    }).catch((err) => {
      console.error('Error creating clicks table', err);
    });
  }
});

/************************************************************/
// Add additional schema definitions below
/************************************************************/
db.knex.schema.hasTable('users').then((exists)=> {
  if(!exists) {
    db.knex.schema.createTable('users', (table) => {
      table.string('username');
      table.string('password');
      table.timestamps();
    }).then(()=>{
      console.log("User Table created");
    }).catch((err) => {
      console.error('Error Creating User Table', err);
    });
  }
})

module.exports = db;
