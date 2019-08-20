const Sequelize = require("sequelize");
const db = require("../config/database");

const EventInscriptions = db.define("EventInscriptions", {
    userId: {
        type: Sequelize.INTEGER
    },
    eventId: {
        type: Sequelize.INTEGER
    }
});

db.sync({ forced: true });

module.exports = EventInscriptions;
