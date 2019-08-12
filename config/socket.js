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
        socket.on('newMessage', async (message) => {
            message.from = socket.request.session.passport.user;

            // search fot the receiver
            if (message.to) {
                console.log(message.to)
                switch (message.to) {
                    case 'toAll': {
                        console.log('inside to all')

                        if (req.user.groupId == 0) {
                            const msgSuccessfullySent = await sendToAll(message)
                            if (msgSuccessfullySent) {
                                console.log('msg sent to all users')
                                res.render('messages', { msg: "message has been sent with success" })
                            } else {
                                console.log('something went wrong, unable to send msg to all users')
                                res.render('messages', { msg: "Oops !! Something went wrong, Try again later" })

                            }

                        }
                        break;
                    }
                    case 'student': {
                        break
                    }
                    case 'coach': {
                        break
                    }

                    default: {
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
                        break;
                    }
                }
            }

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


//******************** helper functions : 

const sendMessage = async (message) => {
    // search fot the receiver
    try {
        const user = await Users.findOne({ where: { username: message.to } });
        if (user) {
            try {
                message.to = user.dataValues.id;
                const msg = await Messages.create(message);
                message.id = msg.id
                message.isRead = msg.isRead
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

const sendToAll = async (message) => {
    try {
        let users = await Users.findAll(
            {
                where: {
                    id: { [Op.notIn]: [req.user.id] }
                }
            },
            { attributes: ['id'] })
        if (users.length > 0) {
            users.forEach(async user => {
                try {
                    message.to = user.dataValues.id;
                    const msg = await Messages.create(message);
                    message.id = msg.id
                    message.isRead = msg.isRead
                    //get socket id of connected user
                    const socketId = connectedUsers.get(message.to);

                    //format message
                    let msgFormated = await formatMessage(message)

                    //broadcast message
                    io.to(socketId).emit('newMessage', msgFormated);

                } catch (err) {
                    console.log(err);
                }
            })
            return true
        }
    } catch (error) {
        console.log(error)
        return false
    }

}


//middleware functions 
const isAdmin = async (id) => {

}