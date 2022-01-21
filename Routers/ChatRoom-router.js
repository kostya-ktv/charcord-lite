 const ChatRoomRouter = require('express').Router();

ChatRoomRouter.get('/', (req, res) => {
    res.render('../Views/ChatRoom/chatroom.ejs')
})

module.exports = ChatRoomRouter;