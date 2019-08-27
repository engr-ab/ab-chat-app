var socket = io(); // by calling this method we are initiating a request, from client to server to open a web socket and keep connection alive
socket.on('connect', function(){
console.log('Server connected');
    
  //emit when connected so we emit inside connect event
    socket.emit('createEmail',
    {
        to:"abc@mail.com",
        text:"i am client",
        createdAt:Date()
    });

    socket.emit('createMessage', {from:'AB', text:"hello all", createdAt:Date()});
});//connect event end

socket.on('disconnect', function() {
    console.log('disconnected from server');
    
});

//when newEmail event fires up, emitted from server lisen it and do something
socket.on('newEmail', function(email){
console.log('new email',email);
});

socket.on('newMessage',function(message){
console.log("message coming from server is: ", message);
});

