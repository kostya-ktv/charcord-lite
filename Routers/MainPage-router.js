const MainPageRouter = require('express').Router();
//Get all routes which are not supported
MainPageRouter.get('/', (req, res) => {
    res.render('../Views/Home/home.ejs')
})

module.exports = MainPageRouter;