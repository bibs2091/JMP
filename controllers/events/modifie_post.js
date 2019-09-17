const Event = require('../../models/Event');
const Sponsor = require('../../models/Sponsors');
const Schedule = require('../../models/Schedule');
module.exports = async(req, res) => {
	try{
		var schedules = [];
		var sponsors = [];
		var cover = null;

		var max = "00";
		var logo =null;
		if (req.files != null){
			logo = req.files;
			max = Object.keys(req.files)[0];
		}
		if(req.body.sponsorsJSON){
			 sponsors = JSON.parse(req.body.sponsorsJSON);
		}
		if (req.body.scheduleJSON){
			schedules = JSON.parse(req.body.scheduleJSON);
		}
		max = parseInt(max.substring(max.length-1,max.length));
		if (max == 0){

			max = sponsors.length+1	;
		}

		console.log(max);

		// getting event infos
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
		const { name, start_t,end_t,start_d,end_d, time, description, tagsJSON,loc ,location} = req.body;
		// getting the location longitude and latitude
		const locationLat = location.split("||")[0] || 35.20822045997799;
		const locationLng = location.split("||")[1] || -0.6333231925964355; 
		var tags ="";
		var tagsJS="";
		if (tagsJSON.length)
			tagsJS = JSON.parse(tagsJSON);
		else
			tagsJS = [];
		for (let i=0;i<tagsJS.length;i++){
			tags += "||"+tagsJS[i];
		}
		tags = tags.substring(2,tags.length);
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

		var oldSponsors = [];
		for (let i=0;i<max-1;i++){

			let sponsor = await Sponsor.findOne(
				{where : {
					name:sponsors[i],
					eventId : id
				}
			});
			console.log(sponsor);
			oldSponsors.push(sponsor);
		}

		//for (var i = oldSponsors.length - 1; i >= 0; i--) {
		//}	

		await Sponsor.destroy({
			where :{
				eventId:id
			}
		});
		for(let i=0;i<oldSponsors.length;i++){
			await Sponsor.create({
				id : oldSponsors[i].id,
				name : oldSponsors[i].name,
				eventId : id,
				logo : oldSponsors[i].logo

			})

		}
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
		    if(sponsors.length){
			let spon =0;
			for(let i=max-1;i<sponsors.length;i++){
				if (sponsors[i] != ""){
					spon = await Sponsor.create({
						eventId : id,
						name :sponsors[i]

					});
					if(req.files){


							await Sponsor.update(
								{
									logo : '/img/events/sponsors/'+ spon.id + ".jpg" 
								},
									{ where: { id: spon.id } }
								)
							await logo[Object.keys(req.files)[i-max+1]].mv(__dirname + '/../../public/img/events/sponsors/'+ spon.id + ".jpg");

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