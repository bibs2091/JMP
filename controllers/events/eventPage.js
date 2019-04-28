const Event = require('../../models/Event');
const Sponsor = require('../../models/Sponsors');
module.exports = async (req, res) => {
	try{
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
			event,
			sponsors
		});
	} catch (err){
		console.log(err);
		res.redirect('/errors');
	}
}