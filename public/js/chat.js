//links.mead.io/dparam  is library to get url parameter's string as a object. and vice versa
var socket = io(); // by calling this method we are initiating a request, from client to server to open a web socket and keep connection alive

//scroll to bottom
function scrollToBottom (){
    //selecrors 
    var messages = $('#messages');
    var newMessage = messages.children('li:last-child');
    var lastMessage = newMessage.prev();
    //heights
    var scrollHeight = messages.prop('scrollHeight');
    var clientHeight = messages.prop('clientHeight');
    var scrollTop = messages.prop('scrollTop');
    var newMessageHeight = newMessage.innerHeight();
    var lastMessageHeight = lastMessage.innerHeight();
    
    if(clientHeight + scrollTop +newMessageHeight + lastMessageHeight >= scrollHeight ){
        messages.scrollTop(scrollHeight);
        
    } 
}

socket.on('connect', function(){
//after connecting start process of joining the chat room
var params = jQuery.deparam(window.location.search); //jQuery==$, dparam takes arguments string and return object
socket.emit('join',params,function(err){
    if(err){
        alert(err);
        window.location.href = '/';
    }else{
        console.log('No error!');
    }
});

//get updated users list
socket.on('updateUsersList',function(users){
    var ol = $('<ol></ol>');

    users.forEach((user)=>{
        ol.append($('<li></li>').text(user));
    });
    $('#users').html(ol);
});

 //emit create message  when server is connected
 var form =document.getElementById('message-form');
 form.addEventListener('submit',function(e){
    e.preventDefault();
    var message = document.getElementById('message-input').value.trim();
    
    socket.emit('createMessage',{text:message} ,function(acknowledgment){
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


socket.on('newMessage',function(message,textColor){
    //ab addedd 
    socket.on('setRoomName',function(room){
        var roomName = $('#roomName');
        roomName.html('You are in chat room: '+room);
        roomName.css({
            'background-color' : 'black',
            'color' : 'white',
            'text-align' : 'center',
            'padding' : '10px',
            'font-size': '30px'
            
        });

        var btn = $('<button id="leaveRoom">Leave Room</button>');
        btn.css({
            'float': 'right',
            'clear': 'right',
        });
        //leave room event listener
         
        roomName.append(btn);
        btn.click(function(e){
            socket.emit('leaveRoom',function(){
                alert('You are out of room');
                window.location.href = '/';
            });
        });
        
    });


    var formatedTime = moment(message.createdAt).format('h:mm a');
    //update timestamp with formated time
    message.createdAt = formatedTime;

    var template = jQuery('#message-template').html();
    var html = Mustache.render(template,{message,textColor});
    // document.querySelector('#messages').append(html); 
    //above append is not same as $('#messages').append(html);
 $('#messages').append(html);
 scrollToBottom();
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
    scrollToBottom();
});



socket.on('disconnect', function() {
    console.log('disconnected from server');
    
});

