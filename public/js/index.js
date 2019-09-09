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

    //send location
    var locationBtn = document.getElementById('send-location');
    locationBtn.addEventListener('click',function(){
       
        if(!navigator.geolocation){
            return alert('Browser do not support Geo location ')
        }
        //first disable th button
        locationBtn.setAttribute('disabled','disabled');
        locationBtn.textContent ='Sending loc...';
        

        //navigator.geolocation.getCurrentPosition(success call back, error callback)
        navigator.geolocation.getCurrentPosition(function(position){
            socket.emit('createLocationMessage',{
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
            });
        },function(){
            alert('Unable to fetch location');

            //enable button if cannot fetch location
            locationBtn.removeAttribute('disabled');
            locationBtn.textContent ='Send location';
        });
    });//click event listener end
});//connect event end


socket.on('newMessage',function(message){
    var formatedTime = moment(message.createdAt).format('h:mm a');
    //update timestamp with formated time
    message.createdAt = formatedTime;

    var template = jQuery('#message-template').html();
    var html = Mustache.render(template,{message});
    // document.querySelector('#messages').append(html); 
    //above append is not same as $('#messages').append(html);
 $('#messages').append(html);

});

socket.on('newLocationMessage', function(location){
    var createdAt = moment(location.createdAt).format('h:mm a');
    var template = $('#location-message-template').html();
    
    var html = Mustache.render(template, 
        {
            from: location.from,
            createdAt: createdAt,
            url: location.url
        });

    $('#messages').append(html);    

    //enable button after sending location link
    document.getElementById('send-location').removeAttribute('disabled');
    document.getElementById('send-location').textContent ='Send location';
});

socket.on('disconnect', function() {
    console.log('disconnected from server');
    
});

