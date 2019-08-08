const webpush = require('web-push')
const { vapidKeys } = require('../config/keys')

const express = require('express');
const router = express.Router();

//subsciption model
const PushSubs = require('../models/pushSubsciption')

webpush.setVapidDetails('mailto:test@test.com', vapidKeys.public, vapidKeys.private)

router.post('/', async (req, res) => {
    const subscription = req.body;
    console.log(subscription)
    if (isValidSaveReq(subscription)) {
        const sub = {
            userId: req.user.id,
            subKey: JSON.stringify(subscription)
        }
        try {
            await PushSubs.create(sub)

        } catch (error) {
            console.log(error)
        }


        res.status(201).json({});

        //create payload
        const payload = JSON.stringify({ title: 'Push notification' });

        //pass object into sendNotification
        webpush.sendNotification(subscription, payload).catch(err => { console.error(err) })
    }

})



module.exports = router;

//helper function 
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