const MainPageRouter = require('express').Router();

MainPageRouter.get('/', (req, res) => {
    res.render('../Views/Home/home.ejs')
})

module.exports = MainPageRouter;