const socketIO = require("socket.io");
const http = require("http");
const express = require("express");
const cors = require("cors");
const app = express();
const server = http.createServer(app);
const io = socketIO(server);
require("dotenv").config({
    path: "./.env",
  });
app.use(cors());
app.get("/",(req,res)=>{
    res.send("Hello world from socket server!");
});

let users =[];

const addUser = (userId, socketId) =>{
    !users.some((user) => user.userId === userId) && users.push({ userId, socketId});

}

// Define a message object with a seen property 

const createMessage = ({senderId, receivedId,text, images})=>({

    senderId,
    receivedId,
    text,
    images,
    seen:false
})

io.on("connection", (socket)=>{
    // when connect
    console.log(`a user is connected`);

    // take userId and socketId from user
    socket.on("addUser", (userId) => {
        addUser(userId, socket.id);
        io.emit("getUsers", users);
        
    })
})



server.listen(process.env.PORT,()=>{
    console.log(`server is running on port ${process.env.PORT}`)
})