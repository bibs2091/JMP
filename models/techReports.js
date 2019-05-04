const Sequelize = require("sequelize");
const db = require("../config/database");

const techReports = db.define("techReports", {
    title: {
        type: Sequelize.STRING
    },
    description: {
        type: Sequelize.STRING
    }
});

db.sync({ forced: true });

module.exports = techReports;
