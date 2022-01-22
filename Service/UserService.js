const DB = require('../dbConnection');
const bcryprt = require('bcryptjs');

//creating a salt for encryption
let salt = '';

//request to DB Create new user
const createUser = async(user) => {
    //same salt for passwords for decryption
    if(!salt) {
        salt = await bcryprt.genSalt(1);
    }
    //encrypton password and set to DB
    let hashPassword = await bcryprt.hash(user.password, salt);
    return await DB('users').insert([
        {
            login: login,
            password: hashPassword,
        }
    ]);
}
//request to DB Find User
const findUser = async(login, password) => {
    let user = await DB('users').where({
        login: login
    })
    //return TRUE if username and password match
    return await bcryprt.compare(password, user[0].password).then(res => {return res});
}
//exports functions
module.exports = {
    createUser,
    findUser
}

