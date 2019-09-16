const Sequelize = require("sequelize");
const db = require("../config/database");

const Schedule = db.define("Schedule", {
  eventId: {
    type : Sequelize.INTEGER
  },
  name: {
    type: Sequelize.STRING,
    notNull: true
  },
  start_d: {
        type: Sequelize.STRING
    },
  start_t: {
        type: Sequelize.STRING
    }
});

db.sync({ forced: true });

module.exports = Schedule;