const Event = require('../../models/Event');
const EventInscriptions = require('../../models/EventInscriptions');
const Sponsor = require('../../models/Sponsors');
const UsersInfo = require('../../models/UsersInfo');


module.exports = async (req, res) => {
	try {
		//getting the current user
		var currentUser = req.user;
		var userInfo = await UsersInfo.findOne({ where: { userId: req.user.id } });
		delete currentUser.password;
		currentUser.info = userInfo.dataValues;

		console.log(req.body);
		const eventInscriptions = await EventInscriptions.findAll(
			{
				where:
				{
					userId: req.user.id,
					eventId: req.params.id
				}
			});
		let registred = false;
		if (eventInscriptions.length) {
			registred = true;
		}
		const sponsors = await Sponsor.findAll(
			{
				where:
				{
					eventId: req.params.id
				}
			})
		const event = await Event.findByPk(req.params.id);
		if (!event) {
			return res.render("404");
		}
		event.dataValues.date.getFullYear() + '-' + ('0' + (event.dataValues.date.getMonth() + 1)).slice(-2) + '-' + ('0' + event.dataValues.date.getDate()).slice(-2);
		res.render('events.event', {
			pageTitle: event.name,
			event,
			sponsors,
			registred,
			currentUser,
			pageName: "Event",
		});
	} catch (err) {
		console.log("errors :\n" + err);
		res.redirect('/errors');
	}
}