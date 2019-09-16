const Event = require('../../models/Event');
const Sponsor = require('../../models/Sponsors');
const Schedule = require('../../models/Schedule');
module.exports = async(req, res) => {
	try{
		console.log(req.body);
		console.log(req.files);
		var schedules = [];
		var sponsors = [];
		var cover = null;
		
		// getting event infos
		if(req.body.sponsorsJSON){
			 sponsors = JSON.parse(req.body.sponsorsJSON);
		}
		if (req.body.scheduleJSON){
			schedules = JSON.parse(req.body.scheduleJSON);
		}
		// if the images are submmited
		if (req.files) {
			if (req.files.cover) {
				cover = req.files.cover;
			}
			
			//getting the sponsors logos
			if (req.files.sponsorImage) {
				logo = req.files.sponsorImage;
				}

			}
		
		const id = req.params.id 
		const { name, start_t,end_t,start_d,end_d, time, description, tags,loc ,location} = req.body;
		// getting the location longitude and latitude
		const locationLat = location.split("||")[0] || 35.20822045997799;
		const locationLng = location.split("||")[1] || -0.6333231925964355; 
		let newevent = await Event.update(
	        {
	        	name,
	        	start_t,
	        	end_t,start_d,
	        	end_d,locationLat,
	        	locationLng, 
	        	location : loc,
	        	description,
	        	tags
	        },
	        {where : {id}}
	        );
		if (cover != null){

		    	newevent = await Event.update(
	        	{	

	        		cover : '/img/events/covers/'+id+".jpg"
	        		
	    		},
	        	{where : {id }}
	        	)
	        	await cover.mv(__dirname + '/../../public/img/events/covers/'+id+".jpg");
		    }
		    if (schedules.length) {
		    	await Schedule.destroy({
					where :  {
						eventId:id
					}
				});
			for (let i=0;i< schedules.length;i++)
				if (schedules[i].name != "")
					await Schedule.create(
						{
							eventId : id,
							name : schedules[i].name,
							start_d : schedules[i].startDate,
							start_t : schedules[i].startTime
						}
					)
			}
		    if (sponsors.length){
		    	await Sponsor.destroy({
					where :  {
						eventId:id
					}
				});
		    	let spon =0;
				for(let i=0;i<sponsors.length;i++){
					if (sponsors[i] != ""){
						spon = await Sponsor.create({
							eventId : id,
							name :sponsors[i]

						});
						if(req.files)
							if(req.files.sponsorImage){
							await Sponsor.update(
								{
									logo : '/img/events/sponsors/'+ spon.id + ".jpg" 
								},
									{ where: { id: spon.id } }
								)
							await logo[i].mv(__dirname + '/../../public/img/events/sponsors/'+ spon.id + ".jpg");
						}

					}
				}
		    }
		    res.redirect('/events/'+id);
	} catch(err) {
		console.log(err);
		res.redirect('/errors');
	}
}