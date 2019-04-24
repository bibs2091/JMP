const Event = require('../../models/Event');
module.exports = async(req, res) => {
	try{

		const id = req.params.id
		const event = await Event.findOne({where :  {id}});
		// format the date value
		event.dataValues.date = event.dataValues.date.getFullYear()  + '-' + ('0'+(event.dataValues.date.getMonth()+1)).slice(-2) + '-' + ('0'+event.dataValues.date.getUTCDate()).slice(-2);
		res.render('events.modifie',{
			event
		})
	} catch(err ) {
		console.log(err);
		res.redirect('/errors');
	}
}