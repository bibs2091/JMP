// define events 
const events = (io) => {
    io.on('connection', (socket) => {
        console.log('new user connnected');
        console.log(socket.request.session.passport)

        // check if user exists in session
        if (socket.request.session.passport == null) {
            return
        }

        // messages 
        socket.on('newMessage', (data) => {
            socket.broadcast.to(data.to).emit('addMessage', { data })
        })
    })

}


//init socket 
const init = (app, session) => {

    const server = require('http').Server(app);
    const io = require('socket.io')(server);

    //grant access to request infos
    io.use((socket, next) => {
        session(socket.request, socket.request.res, next)
    })

    //events
    events(io);

    return server
}

module.exports = init;