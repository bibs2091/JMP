const Event = require('../../models/Event');
module.exports = (req, res) => {
	Event.update(
        {validated: true},
        {where : req.params.id}
        ).then(() => res.redirect('../admin/event'))
        .catch(() => res.redirect('/errors'));
}