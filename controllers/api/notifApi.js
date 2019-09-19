const Op = require('sequelize').Op

//requiring the messages model
const Messages = require('../../models/Message')
//requiring the users model
const Users = require('../../models/UsersInfo')

module.exports = async (req, res) => {
    try {
        var currentUser = req.user;
        var userInfo = await Users.findOne({ where: { userId: req.user.id } });
        delete currentUser.password;
        currentUser.info = userInfo.dataValues;


        //request
        let inbox = await Messages.findAll({ where: { to: req.user.id, [Op.and]: { delReciever: false } }, order: [['createdAt', 'DESC']] });
        inbox = inbox.map(message => {
            return {
                id: message.dataValues.id,
                from: message.dataValues.from,
                to: message.dataValues.to,
                title: message.dataValues.title,
                text: message.dataValues.text,
                date: message.dataValues.date,
                isRead: message.dataValues.isRead == true ? 'readed' : 'unread'
            }
        });

        //get infos 
        await Promise.all(inbox.map(async msg => {
            //do stuff here 
            let sender = await Users.findByPk(msg.from);
            sender = sender.dataValues;
            inbox[inbox.indexOf(msg)].from = sender.firstName + ' ' + sender.lastName;
            inbox[inbox.indexOf(msg)].senderAvatar = sender.avatar;

        }))

        // coount unread messages in inbox
        const unreadMsg = await Messages.findAndCountAll(
            {
                where: { isRead: false, [Op.and]: { delReciever: false } }
            })
        const count = unreadMsg.count.toString()

        res.json({ inbox: inbox.slice(0, 5), count })


    } catch (error) {
        console.log(error)
    }


}