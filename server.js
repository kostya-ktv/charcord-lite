require('dotenv').config();
const express = require('express'),

      cors = require('cors'),
      app = express(),
      http = require('http'),
      server = http.createServer(app),
      serverSocketIO = require('socket.io')(server),
      MainPageRouter = require('./Routers/MainPage-router'),
      AuthenticationRouter = require('./Routers/Authentication-router')

let connectedUsers = [],
    usersConnections =[];

// const salt = await bcryprt.genSalt();
// const hashedPassword = await bcryprt.hash(password, salt);
// bcryprt.compare(password, hashedPassw ord);


app.set('view engine', 'ejs');
//ROUTES
app.use('/', MainPageRouter);
app.use('/login', AuthenticationRouter);
//STATIC VALUES
app.use("/Views", express.static('./Views/'));
app.use("/Assets", express.static('./Assets/'));
app.use("/Model", express.static('./Model/'));


serverSocketIO.sockets.on('connection', (socket)=> {
    console.log("---SUCCESSFULL CONNECT---");
    // usersConnections.push(socket);

    socket.on('chat-message', (data) => {
        serverSocketIO.emit('chat-message', {
            message: data.message,
            name: data.name
        })
        // usersConnections.splice(usersConnections.indexOf(socket), 1);
        console.log("---SUCCESSFULL DICSONECT---");
    })
});

app.use('*', MainPageRouter)
server.listen(process.env.PORT, () => {
    console.log(`SERVER IS LISTENING ON PORT : ${process.env.PORT}`);
});

