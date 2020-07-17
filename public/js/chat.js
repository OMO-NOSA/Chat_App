const socket = io();


const scrollToButtom = () => {
    //Selectors
    let messages = jQuery('#messages');
    let newMessage = messages.children('li:last-child');

    //Heights
    let clientHeight = messages.prop('clientHeight');
    let scrollTop = messages.prop('scrollTop');
    let scrollHeight = messages.prop('scrollHeight');
    let newMessageHeight = newMessage.innerHeight();
    let lastMessageHeight = newMessage.prev().innerHeight();

    if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
        messages.scrollTop(scrollHeight);
    }
}

socket.on("connect", function() {
    console.log("connected to server");
    let params = jQuery.deparam(window.location.search);
    socket.emit('join', params, (err) => {
        if (err) {
            alert(err);
            window.location.href = '/';
        } else {
            console.log("No Error")
        }
    })

});

socket.on("disconnect", function() {
    console.log("disconnected from server");
});


socket.on("newMessage", function(message) {

    let formattedTime = moment(message.createdAt).format("h:mm a");
    let template = jQuery('#message-template').html();
    let html = Mustache.render(template, {
        text: message.text,
        from: message.from,
        createdAt: formattedTime
    });

    jQuery('#messages').append(html);
    scrollToButtom();

    // console.log('New Message', message);
    // let li = jQuery('<li></li>');
    // li.text(`${message.from} ${formattedTime}: ${message.text}`);

    // jQuery('#messages').append(li);
});

socket.on('newLocationMessage', function(message) {
    let formattedTime = moment(message.createdAt).format("h:mm a");
    let template = jQuery('#message-template').html()
    let html = Mustache.render(template, {
        url: message.url,
        from: message.from,
        createdAt: formattedTime
    });

    jQuery("#messages").append(html);
    scrollToButtom();
    //     let li = jQuery('<li></li>');
    //     let a = jQuery('<a target="_blank">My current location</a>');


    //     li.text(`${message.from} ${formattedTime}: `);
    //     a.attr('href', message.url);
    //     li.append(a);
    //     jQuery('#messages').append(li);
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