const AuthenticationRouter = require('express').Router();
const DB = require('../dbConnection');
const { createUser } = require('../Service/UserService');
const { findUser } = require('../Service/UserService');
let message = {
    text: 'SUCCESSFULL'
}

AuthenticationRouter.get('/', async (req, res) => {
    if(Object.keys(req.query).length === 0){
        message.text = 'NEED TO LOGIN';
        res.render('../Views/Home/home.ejs', {message})
    } else {
        let login = req.query.username;
        
        await findUser(login, req.query.password)
        .then(data => {
            data ? res.render('../Views/ChatRoom/chatroom.ejs', {login})
                 : res.render('../Views/Home/home.ejs')
        })
    }
    
    
})

AuthenticationRouter.post('/', async(req, res) => {
    await createUser(req.body.username, req.body.password)
        .then(data => {res.render('../Views/Home/home.ejs', {message})})
})

module.exports = AuthenticationRouter;