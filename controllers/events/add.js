const Event = require('../../models/Event');
module.exports = async (req, res) => {
	try {
		// the user infos
		const user = req.user;
		let validated = false;
		// if the user == admin the event will be directly validated 
		if (user.groupId === 0) {
			validated = true;
		}
		let { cover, planning } = [0, 0];

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
		}
		const { name, date, time, place, description, nbPlace, tags } = req.body;
		// creating the event proposition
		let newevent = await Event.create({ name, time, date, place, description, nbPlace, creatorId, validated, tags });
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



		res.redirect('/events/' + newevent.id);

	} catch (err) {
		console.log(err);
		res.redirect('/errors');
	}

}