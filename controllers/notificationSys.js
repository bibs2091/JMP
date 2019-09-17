const Notification = require('../models/Notification')

const sendNotification = async (userId, text) => {
    try {
        let not = await Notification.create({ userId: userId, text: text })
        if (not) {
            not = not.dataValues
        }
    } catch (error) {
        console.log(error)
    }
}

module.exports = { sendNotification }