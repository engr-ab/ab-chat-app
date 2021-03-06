const path= require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
//1.integrate socket io in webserver

var messages = require('./utils/messages');
var {generateMessage, generateLocationMessage} = messages;
var {isRealString, isUniqueUserName} = require('./utils/validators');
var {Users} = require('./utils/users');


const publicPath = path.join(__dirname,'../public');



var app = express();//express server

//create http server using express server
var server = http.createServer(app); // now we have http server without socket so far

var io = socketIO(server);//consfig server for socket.io, integrate socket.io in server,now we have websockets server now we can listen to events, ready to accept new connections
//setting a socketIO server we have following cool things 1. acceess to a route that accepts incoming connections 2.we have access to a javascript library that makes woking easy with socket io on client we need this library(http://localhost:3000/socket.io/socket.io.js) on client to make connections and transfer data

var users = new Users();

const port = process.env.PORT ||3000;

//configure express static middleware to server a directory for views
app.use(express.static(publicPath));


//behind the scene express uses http module to create the server, we need to configure http ourself so that we can intgrate socket io in it
//1. load http builtin module 2.create server using http.createServer(app) 3.listen server.listen() instead of app.listen() 4.configure server for socket.io, socketIO(server), pass server you want use with websockets

//register an event, io.on allow us for this, special events are registered in io.on() while others are registered in the handler function of io.on('', handler);
io.on('connection',(socket)=>{ //when connection event occur, do something
    console.log('New user connected');
    
    socket.on('getRooms',(callback)=>{
         io.emit('updateRooms', users.getRooms());
        
    });
    
     //check url param: name and room name
     socket.on('join',(params, callback)=>{ 
         if(params.room==""){
           params.room=params.existingRoom;
         }
        if(!isRealString(params.name) || !isRealString(params.room)){
           return callback('Please provide following valid data\n\n*Username\n*Chat Room name');
        } 
        if(!isUniqueUserName(params.name, users.users)){
             return callback( `username: ${params.name} already exists.\n\n*Provide a unique username`);
         }

            socket.join(params.room);
            //remove from previous room before adding to new room
            users.removeUser(socket.id);
            users.addUser(socket.id, params.name, params.room);
            var updatedList = users.getUsersList(params.room);
            
            io.to(params.room).emit('updateUsersList', updatedList);
    
            socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} has joined.`,),'green');
            socket.emit('newMessage',generateMessage('Admin', `Welcome ${params.name}`));
           //added by ab
            socket.emit('setRoomName',params.room);

            callback();
            //socket.leave('room name')
            //io.emit() -> io.to(room).emit()
            //socket.broadcast.emit() ->socket.broadcast.to(rooome name).enit()
            //socket.emit
             //send to all other except  current user(me)
            
    });//join event ends

     //listener 
    socket.on('createMessage', (msg, callback) =>{
        var user = users.getUser(socket.id);
        if(user && isRealString(msg.text)){
            io.to(user.room).emit('newMessage',generateMessage(user.name,msg.text));//will send to all connected
        }
        //send to each client  
     
     // socket.broadcast.emit('newMessage',message);// broadcast will sent to all except itselt,sender
     callback('I am server(Acknowledgement), I got your request; all is ok');
    });//createMssage end

    socket.on('createLocationMessage', (coords)=>{
        var user = users.getUser(socket.id);
        if(user){
            io.to(user.room).emit('newLocationMessage',generateLocationMessage(user.name, coords.latitude, coords.longitude));
        }
        
    });   

    socket.on('disconnect', ()=> {
        console.log('client disconnected');
        var user = users.removeUser(socket.id);
        if(user){
            io.to(user.room).emit('updateUsersList', users.getUsersList(user.room));
            io.to(user.room).emit('newMessage',generateMessage('Admin',`${user.name} has left.`),'red'); 
        }
        
    });
//ab added leaveRoom
    socket.on('leaveRoom',(callback)=>{
        var user = users.removeUser(socket.id);
        if(user){
            io.to(user.room).emit('updateUsersList', users.getUsersList(user.room));
            io.to(user.room).emit('newMessage',generateMessage('Admin',`${user.name} has left.`),'red'); 
        }
         socket.leave(user.room);
         callback();
    });

});//io.on end

server.listen(port,()=>{//when you call app.listen it behind the scene call http create method with argument app
    console.log(`server started at port ${port}`);
});