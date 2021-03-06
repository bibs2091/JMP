const webpush = require('web-push')
const { vapidKeys } = require('../config/keys')

const express = require('express');
const router = express.Router();

//subsciption model
const PushSubs = require('../models/pushSubsciption')

webpush.setVapidDetails('mailto:test@test.com', vapidKeys.public, vapidKeys.private)

router.post('/', async (req, res) => {
    const subscription = req.body;

    if (isValidSaveReq(subscription)) {

        try {
            await PushSubs.findOrCreate({ where: { userId: req.user.id, subKey: subscription } })

        } catch (error) {
            console.log(error)
        }

        res.status(201).json({});

    }

})

// send push to all the users 
router.post('/triggerPush', async (req, res) => {
    const payload = JSON.stringify({
        // TODO: format the data later
        title: 'JMP has a notification ',
        body: req.body.data
    })

    try {
        const subs = await PushSubs.findAll({ attributes: ['userId', "subKey"] })
        if (subs.length > 0) {
            subs.map(sub => sub.dataValues)

            subs.forEach(sub => {
                webpush.sendNotification(sub.subKey, payload).catch(err => {
                    console.error(err)
                    if (err.statusCode === 404 || err.statusCode === 410) {
                        console.log('subscription has expired')
                        //detele from db
                        PushSubs.destroy({ where: { sub } }).then(sub => {
                            console.log('deleting subscription from db')

                        })
                    } else {
                        throw err
                    }
                })
            })
            res.setHeader("Content-Type", "application/data")
            res.send(JSON.stringify({ data: { success: true } }))
        } else {
            sendError('No subscriptions available at the moment', res)
        }


    } catch (error) {
        console.log(error)
    }

})

//send a push notification for a specific user 
router.post('/triggerPush/:id', async (req, res) => {
    const userId = req.params.id
    console.log(req.body)
    const payload = JSON.stringify({
        // TODO: format the data later
        title: 'Junior Makers Program',
        body: req.body.payload.data
    })

    try {
        let sub = await PushSubs.findOne({ where: { userId } })
        if (sub) {
            sub = sub.dataValues

            webpush.sendNotification(sub.subKey, payload).catch(err => {
                if (err.statusCode === 404 || err.statusCode === 410) {
                    console.log('subscription has expired')
                    //detele from db
                    PushSubs.destroy({ where: { sub } }).then(sub => {
                        console.log('deleting subscription from db')

                    })
                    sendError('Subscription has expired', res)
                } else {
                    sendError(err, res)
                }
            })

            res.setHeader("Content-Type", "application/data")
            res.send(JSON.stringify({ data: { success: true } }))
        } else {
            sendError('Unable to find the user', res)
        }


    } catch (error) {
        console.log(error)
    }


})

module.exports = router;

//helper function 
/***************************************************** */

// check if the save req is valid
const isValidSaveReq = (sub) => {
    if (!sub || !sub.endpoint) {
        //ivalide sub
        res.status(400)
        res.setHeader("Content-Type", 'application/json')
        res.send(JSON.stringify({
            error: {
                id: 'no-endpoint',
                message: 'Subscription must have an endpoint'
            }
        }))
        return false
    }
    return true
}

// error handler 
const sendError = (message, res) => {
    res.status(500);
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({
        error: {
            id: 'unable-to-send-messages',
            message: `We were unable to send messages to the user : ${message}`

        }
    }));
}

