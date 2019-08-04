console.log('worker is loaded')
self.addEventListener('push', e => {
    const data = e.data.json();
    console.log('push recieved ..');
    self.registration.showNotification(data.title, {
        body: 'Notification test ...',
        //we can add an icon
    });
})