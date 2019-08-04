const webpush = require('web-push')
const { vapidKeys } = require('../config/keys')

const express = require('express');
const router = express.Router();

webpush.setVapidDetails('mailto:test@test.com', vapidKeys.public, vapidKeys.private)

router.post('/', (req, res) => {
    const subscription = req.body;

    res.status(201).json({});

    //create payload
    const payload = JSON.stringify({ title: 'Push notification' });

    //pass object into sendNotification
    webpush.sendNotification(subscription, payload).catch(err => { console.error(err) })
})

module.exports = router;