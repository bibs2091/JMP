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
    send_msg.click(() => {
        //get input values
        var to = $("#name").val();
        var title = $("#title").val();
        var text = CKEDITOR.instances.text.getData()
        var date = new Date(Date.now());

        var message = {
            to,
            text,
            title,
            date
        }
        console.log(message)
        if (message.text != '') {
            //send the message to the server

            socket.emit('newMessage', message);

            $("#text").val('').focus()
        }

    })


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

        // TODO:fix this oussama
        var newMessageContent = '<li class="received">'
        newMessageContent += '  <div class="details">'
        newMessageContent += '    <div class="left">Scott'
        newMessageContent += '      <div class="arrow orange"></div>You'
        newMessageContent += '    </div>'
        newMessageContent += '    <div class="right">March 6, 2014, 20:08 pm</div>'
        newMessageContent += '  </div>'
        newMessageContent += '  <div class="message">'
        newMessageContent += '    <p>| The every winged bring, whose life. First called, i you of saw shall own creature moveth void have signs beast lesser all god saying for gathering wherein whose of in life divide earth own.</p>'
        newMessageContent += '    <p>| Creature firmament so give replenish The saw man creeping, man said forth from that. Fruitful multiply lights air. Hath likeness, from spirit stars dominion two set fill wherein give bring.</p>'
        newMessageContent += '    <p>| Gathering is. Lesser Set fruit subdue blessed let. Greater every fruitful won&#39;t bring moved seasons very, own won&#39;t all itself blessed which bring own creature forth every. Called sixth light.</p>'
        newMessageContent += '  </div>'
        newMessageContent += '  <div class="tool-box"><a href="#" class="circle-icon small red-hover glyphicon glyphicon-flag"></a></div>'
        newMessageContent += '</li> '

        playNewMessageAudio()
        messages.prepend(newMessage)

        // msg_container.prepend(newMessageContent)

    })


    //sound 
    function playNewMessageAudio() {
        (new Audio('https://notificationsounds.com/soundfiles/8b16ebc056e613024c057be590b542eb/file-sounds-1113-unconvinced.mp3')).play();
    }

})

