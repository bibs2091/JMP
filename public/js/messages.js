
//connect client 
var socket = io.connect('http://5cc87506.ngrok.io/');


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
    var newMessage = `<li class={{item.isRead}} id="${data.id}">
        <div class="col-one">
            <div class="form-check">
              <input type="checkbox" class="form-check-input" id="ck${data.id}" >
              <label for="ck${data.id}" class="form-check-label"></label>
            </div>
            <img src="${data.senderAvatar}" alt="sender avatar">
        </div>
        <div class="col-two">
            <p class="reciever" style="display: none">You</p>        
            <p class="message-date" style="display: none">${data.date.substring(11, 16)} ${data.date.substring(8, 10)}-${data.date.substring(5, 7)}-${data.date.substring(0, 4)}</p> 
        <p class="sender">${data.senderName}</p>  
        <p class="title" style="font-weight:600">${data.title}</p>
        <p class="content">${data.text.replace("<p>", "").replace("</p>", "")}</p>
        </div>
        <div class="col-three">
        <div class="date" style="font-weight:600;font-size:15px;color:rgb(33, 37, 41);">${data.date.substring(11, 16)} ${data.date.substring(8, 10)}-${data.date.substring(5, 7)}-${data.date.substring(0, 4)}</div>
        </div>
      </li>`;

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

    //**************************************************** */

