const Event = require('../../models/Event');
module.exports = async(req, res) => {
	try{
			// getting event infos
		const creatorId = req.user.Id;
	    const {name,date,place,description,cover,nbPlace,planning,validated} = req.body;
	    // creating the event proposition
	    const newevent = await Event.create({name,date,place,description,cover,nbPlace,planning,creatorId,validated});
	    if (req.user.groupId === 0){
	    	res.redirect('/admin/event');

	    }else if(req.user.groupId === 1){
			res.redirect('/coach/event');    	
	    }
	}catch(err){
		req.redirect('/errors');
	}
	
}