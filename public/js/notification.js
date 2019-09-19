
// console.log('notification script is ready')
var notifTest = $('#notifTest')
console.log('loaded in coach')
socket.on('msgNotification', (data) => {
    $(".icon-Message_notification").removeClass("icon-Message_notification").addClass("icon-Message_notification_new");
})