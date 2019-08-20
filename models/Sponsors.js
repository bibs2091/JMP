const Sequelize = require("sequelize");
const db = require("../config/database");

const Sponsors = db.define("Sponsors", {
  eventId: {
    type : Sequelize.INTEGER
  },
  name: {
    type: Sequelize.STRING,
    notNull: true
  },
  logo: {
    type: Sequelize.STRING,
  }
});

db.sync({ forced: true });

module.exports = Sponsors;