const DB = require('../dbConnection');
const bcryprt = require('bcryptjs');
let salt = '';

const createUser = async(login, password) => {
    if(!salt) {
        salt = await bcryprt.genSalt(1);
    }
    let hashPassword = await bcryprt.hash(password, salt);

    return await DB('users').insert([
        {
            login: login,
            password: hashPassword,
        }
    ]);
}
const findUser = async(login, password) => {
    let user = await DB('users').where({
        login: login
    })
    return await bcryprt.compare(password, user[0].password).then(res => {return res});
}

module.exports = {
    createUser,
    findUser
}

