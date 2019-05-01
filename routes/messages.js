const express = require("express");
const router = express.Router();


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

router.get('/sent', async (req, res) => {
	try {
		let sentMessages = await Messages.findAll({ where: { from: req.user.id } });
		sentMessages = sentMessages.map(message => {
			return {
				from: message.dataValues.from,
				to: message.dataValues.to,
				text: message.dataValues.text
			}
		})
		res.status(200).send(JSON.stringify(sentMessages))
	} catch (error) {
		console.log(error);
	}
})

router.get('/user/:username', async (req, res) => {
	const username = req.params.username;
	//search for user
	try {
		const user = await Users.findOne({ where: { username } });
		if (user) {
			const to = user.dataValues.id;
			try {
				let sentMessages = await Messages.findAll({ where: { to } });
				sentMessages = sentMessages.map(message => {
					return {
						from: message.dataValues.from,
						to: message.dataValues.to,
						text: message.dataValues.text
					}
				})
				res.status(200).send(JSON.stringify(sentMessages))
			} catch (error) {
				console.log(error)
			}
		} else {
			res.render('404')
		}
	} catch (error) {
		console.log(error)
	}
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
	let message = req.body;
	message.from = req.user.id;
	console.log('message in router :');
	console.log(message);


	// search fot the receiver
	if (message.to) {
		try {
			const user = await Users.findOne({ where: { username: message.to } });
			if (user) {
				try {
					message.to = user.dataValues.id;
					await Messages.create(message);
					console.log('ready to render')
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
