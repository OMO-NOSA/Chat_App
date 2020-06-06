const socket = io();

socket.on("connect", function() {
    console.log("connected to server");

});

socket.on("disconnect", function() {
    console.log("disconnected from server");
});


socket.on("newMessage", function(message) {
    console.log('New Message', message);
    let li = jQuery('<li></li>');
    li.text(`$(from): $(message.text)`);

    jQuery('#messages').append(li);
});


socket.emit('createMessage', {
    from: 'Frank',
    text: 'Hi'
}, function() {
    console.log('Got it!')
});

jQuery('#message-form').on('submit', function(e) {
    e.preventDefault();

    socket.emit('createMessage', {
        from: 'User',
        text: jQuery('[name=message]').val()
    }, function() {

    });
});