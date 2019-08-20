const EventInscriptions = require('../../models/EventInscriptions');
module.exports = (req, res) => {	
	EventInscriptions.create(
	{
		userId : req.user.id,
		eventId : req.params.id
	}
	).then(() => res.redirect("/events/"+req.params.id))
	.catch((err)=>{
		console.log(err);
		res.redirect("/errors");
	})

}