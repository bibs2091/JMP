const Event = require('../../models/Event');
const Sponsor = require('../../models/Sponsors');
const Schedules = require('../../models/Schedule');
module.exports = async (req, res) => {
	try {
		// the user infos
		const user = req.user;
		let validated = false;

		var cover =null;


		// if the user == admin the event will be directly validated 
		if (user.groupId === 0) {
			validated = true;
		}
		var schedules = [];
		var sponsors = [];

		if (req.body.sponsorsJSON) {
			sponsors = JSON.parse(req.body.sponsorsJSON);
		}
		if (req.body.scheduleJSON) {
			schedules = JSON.parse(req.body.scheduleJSON);
		}
		// getting event infos
		// the creator id 	
		const creatorId = user.id;
		// if the images are submmited
		if (req.files) {
			if (req.files.cover) {
				cover = req.files.cover;
			}

			//getting the sponsors logos
			if (req.files.sponsorImage1) {
				logo = req.files;
			}

		}



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

		// creating the event proposition
		let newevent = await Event.create({ name, time, date, locationLat, locationLng, description, nbPlace, creatorId, validated, tags });

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

		if (sponsors.name) {
			console.log(sponsors.name[1]);
			let spon = 0;
			for (let i = 0; i < sponsors.name.length; i++) {
				spon = await Sponsor.create({
					eventId: newevent.id,
					name: sponsors.name[i]
				});
				await Sponsor.update(
					{
						logo: '/img/events/sponsors/' + spon.id + ".jpg"
					},
					{ where: { id: spon.id } }
				)
				await sponsors.logo[i].mv(__dirname + '/../../public/img/events/sponsors/' + spon.id + ".jpg");
			}

		}
		res.redirect('/events/' + newevent.id);
	} catch (err) {
		console.log("error ==> \n" + err);
		res.redirect('/errors');
	}

}