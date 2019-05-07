const Event = require('../../models/Event');
const Sponsor = require('../../models/Sponsors');
module.exports = async (req, res) => {
	try {
		// the user infos
		console.log(req.body);
		const user = req.user;
		let validated = false;
		// if the user == admin the event will be directly validated 
		if (user.groupId === 0) {
			validated = true;
		}
		let { cover, planning } = [0, 0];
		// getting the sponsors names
		let sponsors = [];
		sponsors.name = req.body.sponsorsName;


		// getting event infos
		// the creator id 	
		const creatorId = user.id;
		// if the images are submmited
		if (req.files) {
			if (req.files.cover) {
				cover = req.files.cover;
			}
			if (req.files.planning) {
				planning = req.files.planning;
			}
			//getting the sponsors logos
			if (sponsors.name) {
				sponsors.logo = req.files.logo;
				// when there is only one sponsor the name and logo are not arrays 
				// but they must be arrays 
				if (!Array.isArray(sponsors.name)){
					sponsors.name = [sponsors.name];
					sponsors.logo = [sponsors.logo];
				}

			}
		}

		const { name, date, time, place, description, nbPlace, tags,location } = req.body;
		// getting the location longitude and latitude
		const locationLat = location.split("||")[0];
		const locationLng = location.split("||")[1]; 
		// creating the event proposition
		let newevent = await Event.create({ name, time, date,locationLat,locationLng, description, nbPlace, creatorId, validated, tags });
		// store the images and there link 
		if (cover) {

			await Event.update(
				{

					cover: '/img/events/covers/' + newevent.id + ".jpg"

				},
				{ where: { id: newevent.id } }
			)
			await cover.mv(__dirname + '/../../public/img/events/covers/' + newevent.id + ".jpg");
		}
		if (planning) {
		
			await Event.update(
				{

					planning: '/img/events/plannings/' + newevent.id + ".jpg"

				},
				{ where: { id: newevent.id } }
			)
			await planning.mv(__dirname + '/../../public/img/events/plannings/' + newevent.id + ".jpg");
		}


		//if there is sponsors ,store them 
		if(sponsors.name){
			console.log(sponsors.name[1]);
			let spon =0;
			for(let i=0;i<sponsors.name.length;i++){
				spon = await Sponsor.create({
					eventId : newevent.id,
					name :sponsors.name[i]
				});
				await Sponsor.update(
					{
						logo : '/img/events/sponsors/'+ spon.id + ".jpg" 
					},
						{ where: { id: spon.id } }
					)
				await sponsors.logo[i].mv(__dirname + '/../../public/img/events/sponsors/'+ spon.id + ".jpg");
				}
		}
		res.redirect('/events/' + newevent.id);

	} catch (err) {
		console.log("error ==> \n"+err);
		res.redirect('/errors');
	}

}