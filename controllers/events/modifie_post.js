const Event = require('../../models/Event');
module.exports = async(req, res) => {
	try{
		console.log(req.body);
		console.log(req.files);
		let {cover,planning}=[0,0];
		if (req.files){
			if (req.files.cover){
				cover = req.files.cover;
			}
			if(req.files.planning){
				planning = req.files.planning; 
			}
		}
		
		const id = req.params.id 
		const {name,date,place,description,nbPlace,validated,tags} = req.body;
		let newevent = await Event.update(
	        {
	        	name,
	        	date,
	        	place,
	        	description,
	        	nbPlace,
	        	validated,
	        	tags
	        },
	        {where : {id:id}}
	        );
		if (cover){

		    	newevent = await Event.update(
	        	{	

	        		cover : '/img/events/covers/'+id+".jpg"
	        		
	    		},
	        	{where : {id }}
	        	)
	        	await cover.mv(__dirname + '/../../public/img/events/covers/'+id+".jpg");
		    }
		    if (planning){

		    	newevent = await Event.update(
	        	{	

	        		planning : '/img/events/plannings/'+id+".jpg"
	        	
	    		},
	        	{where : {id}}
	        	)
	        	await planning.mv(__dirname + '/../../public/img/events/plannings/'+id+".jpg");
		    }
		    res.redirect('/events/'+id);
	} catch(err) {
		console.log(err);
		res.redirect('/errors');
	}
}