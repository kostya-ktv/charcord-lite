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
      ssl: { rejectUnauthorized: false }
    }
  })
// const createUser = async() => {
//     return await DB('users').insert([
//         {
//             login: "kostya",
//             password: "wqdqweg",
//             email: "sgreh@ewg.ro",
//             token: "e3r234r3fgr3gh"
//         }
//     ])
// }
// const getUsers = async() => {
//     return await DB('users').select()
// }
// createUser();
// getUsers().then(data => console.log(data));

module.exports = DB;
  