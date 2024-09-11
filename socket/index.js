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
const removeUser = (socketId) =>{
    users = users.filter((user) => user.socketId !== socketId);
};
const getUser = (receivedId) =>{
    return users.find((user) => user.userId === receivedId);

};



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
        
    });

    // send and get message 
    const messages ={}; // Object to trak messages sent to each user

    socket.on("sendMessage",({senderId,receivedId,text,image})=>{
        const message = createMessage({senderId,receivedId,text,image});

        const user = getUser(receivedId);
        
        // Store the messages in the `message` object
        if(!messages[receivedId]){
            messages[receivedId] = [message];
        }else{
            messages[receivedId].push(message);

        }

        // send the message to the receiver
        io.to(user?.socketId).emit("getMessage",message);

    });
    socket.on("messageSeen",({senderId,receivedId,messageId})=>{
        const user = getUser(senderId)

        //update the seen flag for the message
        if(messages[senderId]){
            const message = messages[senderId].find((message) => message.receivedId === receivedId && message.id === messageId)
            if(message){
                message.seen = true;
                //send a message seen event to the sender
                io.to(user?.socketId).emit("messageSeen",{
                    senderId,
                    receivedId,
                    messageId
                });
            }
        };
      
    });
    socket.on("updateLastMessage", ({lastMessage, lastMessagesId})=>{
        io.emit("getLastMessage",{
            lastMessage,
            lastMessagesId
        });

    });

    //when disconnect 
    socket.on("disconnect",()=>{
        console.log(`a user disconnected`);
        removeUser(socket.id);
        io.emit("getUsers", users);


    })


})



server.listen(process.env.PORT,()=>{
    console.log(`server is running on port ${process.env.PORT}`)
})