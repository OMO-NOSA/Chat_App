const express = require('express');
const socketIO = require('socket.io');
const http = require('http');
const path = require('path');

const publicPath = path.join(__dirname, '../public');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);
const port = process.env.PORT || 3000;
const { generateMessage, generateLocationMessage } = require("./utils/message");
const { isRealString } = require("./utils/validation");

app.use(express.static(publicPath));

io.on("connection", (socket) => {
    console.log('New User Connected');
    socket.emit('newMessage', generateMessage('Admin', 'Welcome to the Chat App'));

    socket.broadcast.emit("newMessage", ("Admin", "Someone new is here, say a big welcome"));
    socket.on('join', (params, callback) => {
        if (!isRealString(params.name) || !isRealString(params.room)) {
            callback('Name and room name are required.');
        }

        callback();
    });
    socket.on("createMessage", (message, callback) => {
        console.log("createMessage", message);

        io.emit('newMessage', generateMessage(message.from, message.text));
        callback();
        // socket.broadcast.emit("newMessage", {
        //     from: message.from,
        //     text: message.text,
        //     createdAt: new Date().getTime()
        // });
    });

    socket.on('createLocationMessage', (coords) => {
        io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude));
    });

    socket.on('disconnection', () => {
        console.log('User was disconnected');
    });
});



server.listen(port, () =>
    console.log(`Server is listening at http: //localhost:${port}`)
);

module.exports = { app };