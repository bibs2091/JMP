const Event = require('../models/Event');
module.exports = (req, res, next) => {
    Event.findByPk(req.params.id)
    .then(event =>{

    	if (req.user.id == event.creatorId)
    		return next();
    	return res.render("404");


    })
    .catch(err => res.redirect('/errors'));
};