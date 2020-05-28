const express = require('express');
const socketIO = require('socket.io');
const http = require('http');
const path = require('path');

const publicPath = path.join(__dirname, '../public');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);
const port = process.env.PORT || 3000;

app.use(express.static(publicPath));

io.on("connection", (socket) => {
    console.log('New User Connected');


    socket.on("createMessage", (message) => {
        console.log("createMessage", message);

        io.emit('newMessage', {
            from: message.from,
            text: message.text,
            createdAt: new Date().getTime()
        });
    });

    socket.on('disconnection', () => {
        console.log('User was disconnected');
    });
});



server.listen(port, () =>
    console.log(`Server is listening at http://localhost:${port}`)
);
module.exports = { app };