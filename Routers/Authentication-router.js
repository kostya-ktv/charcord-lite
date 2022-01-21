const AuthenticationRouter = require('express').Router();
const DB = require('../dbConnection');

AuthenticationRouter.get('/', (req, res) => {
    console.log(req.query);
    DB.from('user')
    .select()
    res.send('dqa')
})

module.exports = AuthenticationRouter;