const Sequelize = require("sequelize");
const db = require("../config/database");

const Event = db.define("Event", {
    name: {
        type: Sequelize.STRING
    },
    start_d: {
        type: Sequelize.STRING
    },
    end_d: {
        type: Sequelize.STRING
    },
    start_t: {
        type: Sequelize.STRING
    },
    end_t: {
        type: Sequelize.STRING
    },
    locationLng: {
        type: Sequelize.STRING

    },
    locationLat: {
        type: Sequelize.STRING

    },
    location: {
        type: Sequelize.STRING

    },
    description: {
        type: Sequelize.STRING
    },
    cover: {
        type: Sequelize.STRING

    },
    nbPlace: {
        type: Sequelize.STRING
    },
    planning: {
        type: Sequelize.STRING
    },
    creatorId: {
        type: Sequelize.INTEGER
    },
    validated: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    },
    tags: {
        type:Sequelize.STRING
    },
    time :{
        type:Sequelize.STRING
    }
});

db.sync({ forced: true });

module.exports = Event;
