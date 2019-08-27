var socket = io(); // by calling this method we are initiating a request, from client to server to open a web socket and keep connection alive
socket.on('connect', function(){
console.log('Server connected');
    //emit create message  when server is connected
   // socket.emit('createMessage', {from:'AB', text:"hello all", createdAt:Date()});
});//connect event end


socket.on('newMessage',function(message){
console.log("message coming is: ", message);
});



socket.on('disconnect', function() {
    console.log('disconnected from server');
    
});

