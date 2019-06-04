const Sequelize = require("sequelize");
const db = require("../config/database");

const Report = db.define("Report", {
    userId: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    type: {
        type: Sequelize.STRING,
        allowNull: false
    },
    indictedType: {
        type: Sequelize.STRING,
        allowNull: false
    },
    indictedId: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    reportDetails: {
        type: Sequelize.STRING
    }
});

db.sync({ forced: true });

module.exports = Report;
