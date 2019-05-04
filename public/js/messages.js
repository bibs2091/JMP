$(function () {
    //connect client 
    var socket = io.connect('http://localhost:3000');

    //button
    var send_msg = $("#send_msg");

    //div to show new messages 
    var messages = $("#messages-test")

    //emit message 
    send_msg.click(() => {
        //get input values
        var to = $("#name").val();
        var text = $("#message").val();

        var message = {
            to,
            text
        }

        //send the message to the server

        socket.emit('newMessage', message);

    })


    //listen to messages 
    socket.on('newMessage', (data) => {
        console.log(data);

        messages.append("<h4>" + data.text + "</h4>")

    })

})
