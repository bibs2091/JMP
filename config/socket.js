const Users = require('../models/UsersInfo')
const Messages = require('../models/Message')

let connectedUsers = new Map();
// define events 
const events = (io) => {
    io.on('connection', (socket) => {
        const userId = socket.request.session.passport.user;

        //add connected user to the online users array
        connectedUsers.set(userId, socket.id)


        console.log('new user connnected : ' + userId);
        console.log(connectedUsers)

        // check if user exists in session
        if (socket.request.session.passport == 'undefined') {
            return
        }


        // messages 
        socket.on('newMessage', (message) => {
            message.from = socket.request.session.passport.user;

            //post req
            sendMessage(message).then(async message => {
                if (message) {
                    //get socket id 
                    const socketId = connectedUsers.get(message.to);

                    //format message
                    let msg = await formatMessage(message)

                    //broadcast message
                    io.to(socketId).emit('newMessage', msg);
                    console.log('message has been sent with success')
                } else {
                    console.log('user not found');
                }
            });

        })

        //disconnect 
        socket.on('disconnect', () => {
            const userId = socket.request.session.passport
            if (socket.request.session.passport == null) {
                return
            }

            connectedUsers.delete(userId.user);
            console.log(`user ${userId.user} has disconnected`)
            console.log(connectedUsers)
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

const sendMessage = async (message) => {
    // search fot the receiver
    try {
        const user = await Users.findOne({ where: { username: message.to } });
        if (user) {
            try {
                message.to = user.dataValues.id;
                await Messages.create(message);
                return message

            } catch (err) {
                console.log(err);

            }
        } else {
            return null

        }
    } catch (err) {
        console.log(err)
    }


}

const formatMessage = async (msg) => {

    let sender = await Users.findByPk(msg.from);
    sender = sender.dataValues;
    msg.senderName = sender.firstName + ' ' + sender.lastName;
    msg.senderUsername = sender.username;
    msg.senderAvatar = sender.avatar;
    console.log('message has been formatted');
    return msg;

}