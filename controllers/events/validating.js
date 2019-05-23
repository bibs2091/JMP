const Event = require('../../models/Event');
module.exports = (req, res) => {
	Event.update(
        {validated: true},
        {where : {id : req.params.id}}
        ).then(() => res.redirect('/events/'+req.params.id))
        .catch((err) =>{
        	console.log("err =>"+err);
        	res.redirect('/errors');
        } );
}