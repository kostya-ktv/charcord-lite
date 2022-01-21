const knex = require('knex');
require('dotenv').config();


const DB = knex({
    client:'pg',
    connection:{
      host: process.env.DBHOST,
      port: process.env.DBPORT,
      user: process.env.DBUSER,
      password: process.env.DBPASSWORD,
      database: process.env.DBDATABASE,
    }
  })
  DB.schema.createTable('user', (table) => {
    table.increments('id')
    table.string('name')
    table.integer('age')
  })
  module.exports = DB;
  