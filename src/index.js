const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const Filter =require('bad-words');
const {generateMessage, generateLocationMessage}=require('./utils/messages');
const {addUser, removeUser, getUser, getUsersInRoom}=require('./utils/users');

const app = express();//generate a new application
const server = http.createServer(app);//if we don't write this, it is done anyway
const io = socketio.listen(server);

const port = process.env.PORT || 3000;
const adminUser ="Admin";

const publicDirectoryPath = path.join(__dirname, '../public');//__dirname : current directory
app.use(express.static(publicDirectoryPath));
let count = 0;
io.on("connection", (socket) => {
    socket.on('join', (options, callback)=>
    {
        const {error, user}=addUser({id:socket.id,...options})
        if(error){
            return callback(error)
        }
        socket.join(user.room)
        socket.emit('message', generateMessage(adminUser,"Welcome"));
        //socket.broadcast.emit('message', 'a new user has joined');      
        socket.broadcast.to(user.room).emit('message', generateMessage(adminUser,`${user.userName} has joined!`));  
        io.to(user.room).emit('roomData',{
            room:user.room,
            users:getUsersInRoom(user.room)
        })
        callback();//without any argument, without any error
    })//socket.emit to a specific client io.emit = all connected clients socke.broadcast.emit all clients except this one. 

    socket.on('sendMessage', (message, callback) => {
        const filter = new Filter();
        if(filter.isProfane(message)){
            return callback('Profanity is not allowed');
        }
        const user = getUser(socket.id);

        io.to(user.room).emit("message", generateMessage(user.userName,message));
        callback('delivered...!');
    })

    socket.on('disconnect', () => {
        const user = removeUser(socket.id);
        if(user)
        {
            io.to(user.room).emit('message', generateMessage(adminUser,`${user.userName} has left`));
            io.to(user.room).emit('roomData',{
                room:user.room,
                users:getUsersInRoom(user.room)
            })
        }        
    }
    )
    socket.on('sendLocation', (coords, callback) => {
        const user = getUser(socket.id);
        console.log(coords);
        io.to(user.room).emit('locationMessageFromServer', generateLocationMessage(user.userName,`https://google.com/maps?q=${coords.latitude},${coords.longitude}`));
        callback();
    });    
})


server.listen(port, () => {
    console.log(`server is up on port ${port}`);
});//start the server up, the port 

