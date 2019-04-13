const Event = require('../../models/Event');
module.exports = async(req, res) => {
	try{
		const user = {groupId :1}
		console.log(req.files);
			// getting event infos
		const creatorId = 1;
		const {cover,planning} = req.files; 
	    const {name,date,place,description,nbPlace,validated,tags} = req.body;
	    // creating the event proposition
	    const newevent = await Event.create({name,date,place,description,nbPlace,creatorId,validated,tags});
	    Event.update(
        {
        	cover : '/img/events/covers'+newevent.id+".jpg",
        	planning : '/img/events/plannings'+newevent.id+".jpg"
    	},
        {where : {id :newevent.id}}
        )
		await cover.mv(__dirname + '/../../public/img/events/covers/'+newevent.id+".jpg");
	    await planning.mv(__dirname + '/../../public/img/events/plannings/'+newevent.id+".jpg");
	    if (user.groupId === 0){
	    	res.redirect('../admin/event');

	    }else if(user.groupId === 1){
			res.redirect('/coach/event');    	
	    }
	}catch(err){
		console.log(err);
		res.redirect('/errors');
	}
	
}