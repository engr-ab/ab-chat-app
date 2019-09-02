var socket = io(); // by calling this method we are initiating a request, from client to server to open a web socket and keep connection alive
socket.on('connect', function(){
console.log('We are connected to the server.');

 //emit create message  when server is connected
 var form =document.getElementById('message-form');

 form.addEventListener('submit',function(e){
    e.preventDefault();
    var message = document.getElementById('message-input').value.trim();
    
    socket.emit('createMessage',{from:'user', text:message} ,function(acknowledgment){
        console.log('Acknowledgement:', acknowledgment);
    });
    //reset form
    form.reset();
    });//form submit event listener end

});//connect event end


socket.on('newMessage',function(message){
 var li = document.createElement('li');
 li.innerHTML = `<span style='color:blue'>${message.from}:</span> ${message.text}`;
 var ol= document.getElementById('messages');
 ol.append(li);

});


socket.on('disconnect', function() {
    console.log('disconnected from server');
    
});
