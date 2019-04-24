const Event = require('../../models/Event');
module.exports = async(req, res) => {
	try{
		let validated = false;
		let {cover,planning}=[0,0];
		// the user infos
		const user = {groupId :1}
			// getting event infos
		// the creator id 	
		const creatorId = 1;
		// if the images are submmited
		if (req.files){
			if (req.files.cover){
				cover = req.files.cover;
			}
			if(req.files.planning){
				planning = req.files.planning; 
			}
		}
	    const {name,date,time,place,description,nbPlace,tags} = req.body;
	    // creating the event proposition
	    let newevent = await Event.create({name,time,date,place,description,nbPlace,creatorId,validated,tags});
	    	// store the images and there link 
		    if (cover){

		    	await Event.update(
	        	{	

	        		cover : '/img/events/covers/'+newevent.id+".jpg"
	        		
	    		},
	        	{where : {id :newevent.id}}
	        	)
	        	await cover.mv(__dirname + '/../../public/img/events/covers/'+newevent.id+".jpg");
		    }
		    if (planning){

		    	await Event.update(
	        	{	

	        		planning : '/img/events/plannings/'+newevent.id+".jpg"
	        	
	    		},
	        	{where : {id :newevent.id}}
	        	)
	        	await planning.mv(__dirname + '/../../public/img/events/plannings/'+newevent.id+".jpg");
		    }
	    	
		
	    // if the user == admin the event will be directly validated 
	    if (user.groupId === 0){
	    	await Event.update({
	    		validated: true
	    	},
	    	{where : {id : newevent.id}});
	    }
	    res.redirect('/events/'+newevent.id);
	    
	}catch(err){
		console.log(err);
		res.redirect('/errors');
	}
	
}