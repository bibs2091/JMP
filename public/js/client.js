
const publicKey = 'BMKp_jwadeX-X4zIX1b4GQxojAtEGpKX9ARTu-8zAHhPKDELypxsveeW6e2xlN5nK8mzvfOpWKAsLzxoaw-pDmE'

//check for service workers 
if ("serviceWorker" in navigator) {
    send().catch(err => console.log(err))
}


//register sw ,push then send push
async function send() {
    //registering service workers 
    try {
        const register = await navigator.serviceWorker.register('worker.js', {
            scope: '/'
        });
        console.log('service worker registered');

        //register push
        try {
            const subscription = await register.pushManager.subscribe({
                userVisibleOnly: true,
                applicationServerKey: urlBase64ToUint8Array(publicKey)
            });

            //send post request
            const response = await fetch('/subscribe', {
                method: 'POST',
                body: JSON.stringify(subscription),
                headers: {
                    "Content-Type": 'application/json',
                }
            })
            console.log('push has been sent')
            if (!response.ok) {
                throw new Error('Bad status code from server')
            }
            return response.json()

        } catch (err) {
            console.error(err)
        }




    } catch (err) {
        console.log(err)
    }



}

//encoding 
function urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
        .replace(/-/g, '+')
        .replace(/_/g, '/');

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}