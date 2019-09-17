const Notification = require('../models/Notification')

const sendNotification = async (userId, text) => {
    try {
        const not = await Notification.create({ userId, text })
        if (not) {
            not = not.dataValues
            console.log(not)
        }
    } catch (error) {
        console.log(error)
    }
}

module.exports = sendNotification