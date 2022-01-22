require('dotenv').config();
const express = require('express'),
      bodyParser = require('body-parser'),
      cors = require('cors'),
      app = express(),
      http = require('http'),
      server = http.createServer(app),
      serverSocketIO = require('socket.io')(server),
      MainPageRouter = require('./Routers/MainPage-router'),
      AuthenticationRouter = require('./Routers/Authentication-router');
let sockets = [];

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }))
//ROUTES
app.use('/', MainPageRouter);
app.use('/login', AuthenticationRouter);
app.use('/signup', AuthenticationRouter);

//STATIC VALUES
app.use("/Views", express.static('./Views/'));
app.use("/Assets", express.static('./Assets/'));
app.use("/Model", express.static('./Model/'));

//SERVER LISTENERS
serverSocketIO.sockets.on('connection', (socket)=> {
    console.log("---SUCCESSFULL CONNECT---");
    //GET USERNAME
    let referer = socket.handshake.headers.referer;
    let userName = referer.slice(
        referer.indexOf('=') + 1,
        referer.indexOf('&')
    );
    //SEND FOR ALL USERS MESSAGE 
    socket.broadcast.emit('join', userName + " joined");
    //SEND NEW MESSAGE TO CHAT
    socket.on('chat-message', (data) => {
        serverSocketIO.emit('chat-message', {
            message: data.message,
            name: data.name
        })
    
     console.log("---MESSAGE SENT---");
    })
    
    
});


app.use('*', MainPageRouter);

server.listen(process.env.PORT, () => {
    console.log(`SERVER IS LISTENING ON PORT : ${process.env.PORT}`);
});

