const Notification = require('../models/Notification')

const sendNotification = async (userId, text) => {
    try {
        let not = await Notification.create({ userId: userId, text: text })
        if (not) {
            not = not.dataValues
            return not
        }
    } catch (error) {
        console.log(error)
    }
}

const markAsRead = async (id) => {
    try {
        let notif = await Notification.update(
            { isRead: true },
            { where: { id } }
        )
    } catch (error) {
        console.log(error)
    }
}

module.exports = { sendNotification, markAsRead }