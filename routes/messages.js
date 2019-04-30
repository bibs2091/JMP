const express = require("express");
const router = express.Router();
const db = require('../config/database')

//requiring the messages model
const Messages = require('../models/Message')
//requiring the users model
const Users = require('../models/UsersInfo')

//route		/messages
//methode 	GET
//access	private
//desc		get user's inbox

router.get('/', (req, res) => {
	res.send('this is inbox')
})

//route		/messages/sent
//methode 	GET
//access	private
//desc		get user's sent messages

router.get('/sent', (req, res) => {
	res.send('messages u sent')
})

//route		/messages/new_message
//methode 	GET
//access	private
//desc		write a new message

router.get("/new_message", (req, res) => {
	res.render('messages');
});

router.post('/new_message', async (req, res) => {
	// create the message object
	let message = {
		from: req.user.id,
		to: req.body.receiver,
		text: req.body.message,
		isRead: false
	}
	// search fot the receiver
	if (message.to) {
		try {
			const user = await Users.findOne({ where: { username: message.to } });
			if (user) {
				try {
					message.to = user.dataValues.id;
					await Messages.create(message);
					res.render('messages', { msg: "message has been sent with success" })

				} catch (err) {
					console.log(err);

				}
			} else {
				res.render('messages', { msg: "there is no user under the username " + message.to })

			}
		} catch (err) {
			console.log(err)
		}

	}

})


module.exports = router;
