const express = require("express");
const router = express.Router();

const Op = require('sequelize').Op

//requiring the messages model
const Messages = require('../models/Message')
//requiring the users model
const Users = require('../models/UsersInfo')

//route		/messages
//methode 	GET
//access	private
//desc		get user's inbox

router.get('/', async (req, res) => {

	try {
		//pagination
		const paginate = ({ page, pageSize }) => {
			const offset = (page - 1) * pageSize
			const limit = pageSize

			return {
				offset, // the records we jump
				limit,  // how many we retrieve
			}
		}

		//TODO: replace later with query from req.body

		let { page, pageSize } = { page: 1, pageSize: 5 };

		//request
		let inbox = await Messages.findAll({ where: { to: req.user.id }, ...paginate({ page, pageSize }), order: [['updatedAt', 'DESC']] });
		inbox = inbox.map(message => {
			return {
				id: message.dataValues.id,
				from: message.dataValues.from,
				to: message.dataValues.to,
				title: message.dataValues.title,
				text: message.dataValues.text,
				date: message.dataValues.date
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



		// console.log(inbox);
		res.render('inbox', { inbox })
	} catch (error) {
		console.log(error)
	}


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
		res.status(200).json(sentMessages)
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
				res.status(200).json(sentMessages)
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

	// search fot the receiver
	if (message.to) {
		console.log(message.to)
		switch (message.to) {
			case 'toAll': {
				console.log('inside to all')

				if (req.user.groupId == 0) {
					await sendToAll(message)
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
				break;
			}
		}


	}

})



//route		/messages/delete
//methode 	POST
//access	private
//desc		delete a message
router.post('/delete/:id', async (req, res) => {
	const msgId = req.params;
	try {
		//TODO: complete the delete function
		let message = await Messages.findByPk(msgId);
		message = message.dataValues;

	} catch (error) {
		console.log(error)
	}

})

module.exports = router;

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
					if (message.from == user.dataValues)
						message.to = user.dataValues.id;
					await Messages.create(message);
					console.log('msg sent to all users')
					res.render('messages', { msg: "message has been sent with success" })

				} catch (err) {
					console.log(err);
				}
			})
		}
	} catch (error) {
		console.log(error)
	}

}