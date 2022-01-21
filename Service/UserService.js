const DB = require('../dbConnection');
const bcryprt = require('bcryptjs');

 const createUser = async(login, password) => {
    let salt = await bcryprt.genSalt(4);
    let hashPassword = await bcryprt.hash(password, salt);

    return await DB('users').insert([
        {
            login: login,
            password: hashPassword,
        }
    ]);
}

module.exports = {
    createUser
}

