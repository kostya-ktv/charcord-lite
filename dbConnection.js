const knex = require('knex');
require('dotenv').config();

//CONNECTION TO OUR DB
const DB = knex({
    client:'pg',
    connection:{
      host: process.env.DBHOST,
      port: process.env.DBPORT,
      user: process.env.DBUSER,
      password: process.env.DBPASSWORD,
      database: process.env.DBDATABASE,
      ssl: { rejectUnauthorized: false }
    }
  })

module.exports = DB;
  