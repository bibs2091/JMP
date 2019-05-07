const Event = require('../../models/Event');
const EventInscriptions = require('../../models/EventInscriptions');
const Sponsor = require('../../models/Sponsors');
module.exports = async (req, res) => {
	try{
		const eventInscriptions = await EventInscriptions.findAll(
		{
			where:
			{
				userId : req.user.id,
				eventId : req.params.id
			}
		});
		let registred = false;
		if (eventInscriptions.length ){
			registred = true;
		}
		const sponsors = await Sponsor.findAll(
			{where :
				{
					eventId : req.params.id
				}})
		const event = await Event.findByPk(req.params.id);
		if (!event) {
			return res.render("404");
		}
		event.dataValues.date.getFullYear() + '-' + ('0' + (event.dataValues.date.getMonth() + 1)).slice(-2) + '-' + ('0' + event.dataValues.date.getDate()).slice(-2);
		res.render('events.event', {
			pageTitle:"event page",
			event,
			sponsors,
			registred,
			showMap:true
		});
	} catch (err){
		console.log("errors ===>\n"+err);
		res.redirect('/errors');
	}
}