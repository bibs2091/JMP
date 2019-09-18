const UsersInfo = require("../../models/UsersInfo");
const Events = require("../../models/Event");
const EventInscriptions = require('../../models/EventInscriptions');

module.exports = async (req, res) => {
    try {
        var currentUser = req.user;
        var userInfo = await UsersInfo.findOne({ where: { userId: req.user.id } });
        delete currentUser.password;
        currentUser.info = userInfo.dataValues;

        var events = [];
        var event = null;
        const eventInscriptions = await EventInscriptions.findAll({ where: { userId: currentUser.id } });
        for (let i = 0; i < eventInscriptions.length; i++) {
            event = await Events.findByPk(eventInscriptions[i].eventId);

            event.month = event.start_d.substring(2, event.start_d.length - 6);
            console.log(event.month);
            event.day = event.start_d.substring(0, 2);
            events.push(event);
        }
        res.render("user.events", {
            currentUser,
            events,
            pageName: "My Events",
            pageTitle: "My Events - JMP"
        });
    }
    catch (err) {
        console.log(err);
        res.redirect("/error");
    }
}