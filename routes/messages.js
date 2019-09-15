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
		var currentUser = req.user;
		var userInfo = await Users.findOne({ where: { userId: req.user.id } });
		delete currentUser.password;
		currentUser.info = userInfo.dataValues;

		// //pagination
		// const paginate = ({ page, pageSize }) => {
		// 	const offset = (page - 1) * pageSize
		// 	const limit = pageSize

		// 	return {
		// 		offset, // the records we jump
		// 		limit,  // how many we retrieve
		// 	}
		// }

		// //TODO: replace later with query from req.body

		// let { page, pageSize } = { page: 1, pageSize: 5 };

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

		// console.log(inbox);
		res.render('inbox', { inbox, count, currentUser })
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
		let sentMessages = await Messages.findAll({
			where: { from: req.user.id, [Op.and]: { delSender: false } }
		});
		sentMessages = sentMessages.map(message => {
			return {
				id: message.dataValues.id,
				from: message.dataValues.from,
				to: message.dataValues.to,
				title: message.dataValues.title,
				text: message.dataValues.text,
				date: message.dataValues.date,
			}

		})
		//get infos 
		await Promise.all(sentMessages.map(async msg => {
			//do stuff here 
			let reciever = await Users.findByPk(msg.to);
			reciever = reciever.dataValues;
			sentMessages[sentMessages.indexOf(msg)].to = reciever.firstName + ' ' + reciever.lastName;
			sentMessages[sentMessages.indexOf(msg)].recieverAvatar = reciever.avatar;

		}))
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

router.get("/new_message", async (req, res) => {
	var currentUser = req.user;
	var userInfo = await Users.findOne({ where: { userId: req.user.id } });
	delete currentUser.password;
	currentUser.info = userInfo.dataValues;
	res.render('messages', { currentUser });
});


//route		/messages/delete
//methode 	POST
//access	private
//desc		delete a message


router.post('/read/:id', async (req, res) => {
	const id = req.params.id
	try {
		let msg = await Messages.update({ isRead: true }, { returning: true, where: { id } })
		if (msg[1][0]) {
			res.send({ succuess: true })
		} else {
			res.status(400).send('Bad request')

		}
	} catch (error) {
		console.log(error)
		res.status(500)
	}


});

router.delete("/delete", async (req, res) => {
	let ids = JSON.parse(req.body.ids);


	if (ids.length > 0) {
		try {
			let admin = req.user.id

			let msgToDelete = await Messages.findByPk(ids[0])
			msgToDelete = msgToDelete.dataValues

			if (admin === msgToDelete.to) {
				//delete for reciever
				ids.forEach(async msgId => {
					let message = await Messages.update(
						{ delReciever: true },
						{ returning: true, where: { id: msgId } }
					)
					if (!message[1][0]) {
						throw new Error("Error, wrong data")
					}
				})

			} else {
				// sender deleting sent messages 
				ids.forEach(async msgId => {
					let message = await Messages.update(
						{ delSender: true },
						{ returning: true, where: { id: msgId } }
					)
					if (!message[1][0]) {
						throw new Error("Error")
					}

				})

			}
			res.send({ succuess: true });

		} catch (error) {
			console.log(error)
			res.send({ succuess: false })
		}
	} else {
		return res.send({ succuess: false })
	}

})

module.exports = router;
