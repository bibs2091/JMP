const Event = require('../models/Event');
module.exports = (req, res, next) => {
    if (req.isAuthenticated()) {
    	Event.findByPk(req.params.id)
    	.then(event =>{

    		if (req.user.id === event.creatorId)
        		next();
        	else 
        		return res.render("404");
    	})
    	.catch(err => res.redirect('/errors'));
    }
    else 
    	return res.render("404");
};