const UsersInfo = require("../../models/UsersInfo");
const Event = require('../../models/Event')

module.exports = async (req, res) => {
    try {//get current user info
        var currentUser = req.user;
        var userInfo = await UsersInfo.findOne({ where: { userId: req.user.id } });
        delete currentUser.password;
        currentUser.info = userInfo.dataValues;
        // get my events
        let events = await Event.findAll({
            where: { creatorId: currentUser.id }
        })
        let validatedEvent = []
        let notValidated = []
        events.forEach(event => {
            let index = event.dataValues.start_d.indexOf(' ') + 1
            let currentEvent = {
                id: event.dataValues.id,
                name: event.dataValues.name,
                location: event.dataValues.location,
                startDay: event.dataValues.start_d,
                description: event.dataValues.description,
                cover: event.dataValues.cover,
                month: event.dataValues.start_d.substring(index, index + 3),
                day: event.dataValues.start_d.substring(0, index)
            }
            if (event.dataValues.validated) {
                validatedEvent.push(currentEvent)
            } else {
                notValidated.push(currentEvent)
            }
        })
        return res.render("coach.myevents", {
            pageName: "My Events",
            pageTitle: currentUser.info.username + " - My Events",
            currentUser,
            validatedEvent,
            notValidated
        });
    } catch (err) {
        console.log(err);
        return res.redirect("/error");
    }
};