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
    li.text(`${message.from}: ${message.text}`);

    jQuery('#messages').append(li);
});

socket.on('newLocationMessage', function(message) {
    let li = jQuery('<li></li>');
    let a = jQuery('<a target="_blank">My current location</a>');

    li.text(`${message.from}: `);
    a.attr('href', message.url);
    li.append(a);

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

    this.reset();
});

const locationButton = $('#send-location');
locationButton.on('click', () => {
    if (!navigator.geolocation) {
        return alert("Geolocation is not supported by your browser");
    }
    locationButton.attr('disabled', 'disabled').text('Sending location ...');

    navigator.geolocation.getCurrentPosition((position) => {
        locationButton.removeAttr('disabled').text('Send location');
        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitutude: position.coords.longitude
        })
    }, () => {
        locationButton.removeAttr("disabled").text("Send location");
        alert('Unable to fetch location.')
    });

});