const AuthenticationRouter = require('express').Router();
const DB = require('../dbConnection');
const { createUser } = require('../Service/UserService')
let message = {
    text: 'OK'
}

AuthenticationRouter.get('/', async (req, res) => {

    if(Object.keys(req.query).length === 0){
        message.text = 'NEED TO LOGIN';
        console.log("empty");
        res.render('../Views/Home/home.ejs', {message})
    }
    
})

AuthenticationRouter.post('/', async(req, res) => {
    console.log(req.body);
    await createUser(req.body.username, req.body.password);
    
    res.render('../Views/Home/home.ejs', {message})
})

module.exports = AuthenticationRouter;