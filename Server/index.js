// app.js

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const connectDB = require('./config/db');
const routes = require('./route/user');
const chatRoute = require("./route/chatRoute")
const messageRoute = require("./route/messageRoute")
const app = express();
app.use(bodyParser.json());

app.use(cors());
connectDB();
// Use routes
app.use('/api/user', routes);
app.use('/api/chat', chatRoute);
app.use('/api/message', messageRoute);


const PORT = process.env.PORT || 8080;
const server = app.listen(
    PORT,
    console.log(`Server running on PORT ${PORT}...`)
);
const io = require("socket.io")(server, {
    pingTimeout: 60000,
    cors: {
        origin: "http://localhost:3000",
        // credentials: true,
    },
});

io.on("connection", (socket) => {
    console.log("Connected to socket.io");
    socket.on("setup", (userData) => {
        socket.join(userData._id);
        socket.emit("connected");
    });

    socket.on("join chat", (room) => {
        socket.join(room);
        console.log("User Joined Room: " + room);
    });
    socket.on("typing", (room) => socket.in(room).emit("typing"));
    socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));

    socket.on("new message", (newMessageReceived) => {
        const chat = newMessageReceived.chat;

        if (!chat.users) return console.log("chat.users not defined");

        chat.users.forEach((user) => {
            if (user._id !== newMessageReceived.sender._id) {
                socket.in(user._id).emit("jitendraMsg", newMessageReceived);
                console.log("newMessageReceived::", user, user._id);
            }

        });
    });


    socket.off("setup", () => {
        console.log("USER DISCONNECTED");
        socket.leave(userData._id);
    });
});