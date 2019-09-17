const Event = require('../../models/Event');
const EventInscriptions = require('../../models/EventInscriptions');
const Sponsor = require('../../models/Sponsors');
const UsersInfo = require('../../models/UsersInfo');
const Schedule = require('../../models/Schedule');


module.exports = async (req, res) => {
	try {
		//getting the current user
		var currentUser = req.user;
		var isAdmin = false;
		var isOwner = false;

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
		const notvalidated = !event.validated; 
		if (currentUser.groupId == 0){
			isAdmin = true;
			isOwner = true;
		}else if (currentUser.groupId == 1){

    		if (currentUser.id == event.creatorId){
    			isOwner =true;
    		}
		}
		if (!event) {
			return res.render("404");
		}
		for(let i=0;i<schedules.length;i++){
			schedules[i].start_d = schedules[i].start_d.substring(0,schedules[i].start_d.length-6);
		}
		event.tags = event.tags.split("||");

		res.render('events.event', {
			pageTitle: event.name,
			event,
			sponsors,
			schedules,
			registred,
			currentUser,
			isAdmin,
			isOwner,
			notvalidated,
			pageName: "event page",
		});
	} catch (err) {
		console.log("errors :\n" + err);
		res.redirect('/errors');
	}
}