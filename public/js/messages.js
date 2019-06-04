$(function () {
    //connect client 
    var socket = io.connect('http://localhost:3000');

    //button
    var send_msg = $("#send_msg");

    //div to show new messages 
    var messages = $(".message-list")

    //emit message 
    send_msg.click(() => {
        //get input values
        var to = $("#name").val();
        var title = $("#title").val();
        var text = $("#text").val().trim();
        var date = new Date(Date.now());

        var message = {
            to,
            text,
            title,
            date
        }

        if (message.text != '') {
            //send the message to the server

            socket.emit('newMessage', message);

            $("#text").val('').focus()
        }

    })


    //listen to messages 
    socket.on('newMessage', (data) => {

        var newMessage = '<li class="unread">'
        newMessage += '<div class="col-one">'
        newMessage += '<div class="checkbox-wrapper">'
        newMessage += '<input type="checkbox" id="chk1">'
        newMessage += '<label for="chk1" class="toggle"></label> '
        newMessage += '</div>'
        newMessage += '<img src=' + data.senderAvatar + ' alt="sender avatar">'
        newMessage += '</div>'
        newMessage += '<div class="col-two">'
        newMessage += '<p class="reciever" style="display: none">You</p> '
        newMessage += '<p class="message-date" style="display: none">' + data.date.toString() + '</p> '
        newMessage += '<p class="sender">' + data.senderName + '</p>'
        newMessage += '<p class="title"> ' + data.title + '</p>'
        newMessage += '<p class="content">' + data.text + '</p> '
        newMessage += ' </div>'
        newMessage += '<div class="col-three"> '
        newMessage += '<div class="date">' + data.date + '</div> '
        newMessage += '</div>'
        newMessage += '</li>'
        playNewMessageAudio()
        messages.prepend(newMessage)

    })


    //sound 
    function playNewMessageAudio() {
        (new Audio('https://notificationsounds.com/soundfiles/8b16ebc056e613024c057be590b542eb/file-sounds-1113-unconvinced.mp3')).play();
    }

})

