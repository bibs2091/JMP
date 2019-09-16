const Event = require('../../models/Event');
const EventInscriptions = require('../../models/EventInscriptions');
const Sponsor = require('../../models/Sponsors');
const UsersInfo = require('../../models/UsersInfo');
const Schedule = require('../../models/Schedule');


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
			});
		var schedules = await Schedule.findAll(
			{
				where:
				{
					eventId: req.params.id
				}
			})
		var event = await Event.findByPk(req.params.id);
		if (!event) {
			return res.render("404");
		}
		for(let i=0;i<schedules.length;i++){
			schedules[i].start_d = schedules[i].start_d.substring(0,schedules[i].start_d.length-6);
		}
		event.tags = event.tags.split("||");
		console.log(event.tags);
		res.render('events.event', {
			pageTitle: event.name,
			event,
			sponsors,
			schedules,
			registred,
			currentUser,
			pageName: "event page",
		});
	} catch (err) {
		console.log("errors :\n" + err);
		res.redirect('/errors');
	}
}