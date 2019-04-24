const Event = require('../../models/Event');
module.exports = async (req, res) => {
	const event = await Event.findByPk(req.params.id);
	if (!event) {
		return res.render("404");
	}
	event.dataValues.date.getFullYear() + '-' + ('0' + (event.dataValues.date.getMonth() + 1)).slice(-2) + '-' + ('0' + event.dataValues.date.getDate()).slice(-2);
	res.render('events.event', {
		event
	});
}