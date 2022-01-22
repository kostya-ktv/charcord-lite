const AuthenticationRouter = require('express').Router();
const DB = require('../dbConnection');
const { createUser } = require('../Service/UserService');
const { findUser } = require('../Service/UserService');
const User = require('../Model/User')

//empty variable initialization
let message = {};
// GET request receiving router for Login
AuthenticationRouter.get('/', async (req, res) => {
    //empty request check
    if(Object.keys(req.query).length === 0){
        message.text = 'Need to login';
        //redirect to home page with alert
        res.render('../Views/Home/home.ejs', {message})
    } else {
        //request to DB 
        let login = req.query.username;
        let user = new User(req.query.username, req.query.password);
        message.text = 'Incorrect username or password';
        //bolean return. true - redirect us to charRoom with our username
        //false and Error catching - redirect to home page with alert message
        await findUser(login, req.query.password)
        .then(data => {
            data ? res.render('../Views/ChatRoom/chatroom.ejs', {user})
                 : res.render('../Views/Home/home.ejs', {message})
            })
        .catch(e => {
            res.render('../Views/Home/home.ejs', {message})
            })
    }
    
    
})
// POST request receiving router for SIGNUP
AuthenticationRouter.post('/', async(req, res) => {

    let user = new User(req.body.username, req.body.password );
    await createUser(req.body.username, req.body.password)
    //in both cases registation successful/unsuccsessful, redirect to home page with current alert
        .then(data => {
            message.text = 'Successful registration';
            res.render('../Views/Home/home.ejs', {message})
        })
        .catch(error => {
            message.text = 'User already registered';
            res.render('../Views/Home/home.ejs', {message})
        })
})

module.exports = AuthenticationRouter;