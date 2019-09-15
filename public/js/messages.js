$(function () {
    //connect client 
    var socket = io.connect('http://localhost:3000');

    //button
    var send_msg = $("#send_msg");

    //div to show new messages 
    var messages = $(".message-list")

    //div to show message content
    // var msg_container = $('.message-container')

    //emit message 
    function html_entity_decode(s) {
        var t = document.createElement('textarea');
        t.innerHTML = s;
        var v = t.value;
        return v;
    }
    send_msg.click(() => {
        //get input values
        var to = $("#name").val();
        var title = $("#title").val();
        var text = CKEDITOR.instances.text.getData()
        var date = new Date(Date.now());

        //split 
        if (to.search(',') === -1) {
            //one receiver 
            var message = {
                to,
                text,
                title,
                date
            }
            sendMessage(message)

        } else {
            //more than one receiver
            var receivers = to.split(',')
            console.log(receivers)
            receivers.forEach(user => {
                var message = {
                    to: user,
                    text,
                    title,
                    date
                }
                sendMessage(message)
            })
        }



    })

    function sendMessage(message) {
        console.log(message)
        if (message.text != '') {
            //send the message to the server

            socket.emit('newMessage', message);

            $("#text").val('').focus()
        }
    }

    //listen to messages 
    socket.on('newMessage', (data) => {
        console.log(data.text)
        var newMessage = '<li class="unread">'
        newMessage += '<div class="col-one">'
        newMessage += '<div class="checkbox-wrapper">'
        newMessage += '<input type="checkbox" id="chk' + data.id + '">'
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

        // msg_container.prepend(newMessageContent)

    })
    socket.on('status', (status) => {
        console.log(status);
        var type, message;
        if (status.success) {
            type = "success";
            message = "Message has been sent successfully!";
        } else {
            type = "danger";
            message = "An error has occured, please try again!"
        }
        var html = `<center><div class="alert alert-${type}" style="width: 70%;">${message}</div></center>`;
        $("#new-message-alerts").html(html);
        setTimeout(function () {
            location.reload();
        }, 3000);
    })

    //sound 
    function playNewMessageAudio() {
        (new Audio('https://notificationsounds.com/soundfiles/8b16ebc056e613024c057be590b542eb/file-sounds-1113-unconvinced.mp3')).play();
    }

})

