const Event = require('../../models/Event');
module.exports = async(req, res) => {
	// getting event infos
	const creatorId = req.user.groupId;
    const {name,date,place,description,cover,nbPlace,planning,validated} = req.body;
    // creating the event proposition
    const newevent = await Event.create({name,date,place,description,cover,nbPlace,planning,creatorId,validated});
    res.send(newevent);
}