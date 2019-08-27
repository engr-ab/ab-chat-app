const path= require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
//1.integrate socket io in webserver

const publicPath = path.join(__dirname,'../public');
console.log(publicPath);

var app = express();//express server

//create http server using express server
var server = http.createServer(app); // now we have http server without socket so far

var io = socketIO(server);//consfig server for socket.io, integrate socket.io in server,now we have websockets server now we can listen to events, ready to accept new connections
//setting a socketIO server we have following cool things 1. acceess to a route that accepts incoming connections 2.we have access to a javascript library that makes woking easy with socket io on client we need this library(http://localhost:3000/socket.io/socket.io.js) on client to make connections and transfer data

const port = process.env.PORT ||3000;

//configure express static middleware to server a directory for views
app.use(express.static(publicPath));


//behind the scene express uses http module to create the server, we need to configure http ourself so that we can intgrate socket io in it
//1. load http builtin module 2.create server using http.createServer(app) 3.listen server.listen() instead of app.listen() 4.configure server for socket.io, socketIO(server), pass server you want use with websockets

//register an event, io.on allow us for this, special events are registered in io.on() while others are registered in the handler function of io.on('', handler);
io.on('connection',(socket)=>{ //when connection event occur, do something
    console.log('New user connected');
    
    socket.emit('newEmail',{
         from: "engr.ab20@gmail.com",
         text:"hello new client!",
         createdAt: Date()
        });//newEmail end

    socket.emit('newMessage',{from:"Ali", text:'hello ab ', createdAt:Date()});  

    socket.on('createEmail',(email)=>{
        console.log(email);
    });//createEmail end

    socket.on('createMessage', (message)=>{
        console.log("\n\n new message from client",message);
    });

    socket.on('disconnect', ()=> {
        console.log('client disconnected');
    });

});//io.on end

server.listen(port,()=>{//when you call app.listen it behind the scene call http create method with argument app
    console.log(`server started at port ${port}`);
});