console.log('worker is loaded')
self.addEventListener('push', e => {
    const data = e.data.json();
    console.log(data)
    console.log('push recieved ..');
    self.registration.showNotification(data.title, {

        body: data.body,
        //we can add an icon
    });
})