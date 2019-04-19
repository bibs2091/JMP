const Sequelize = require("sequelize");
const db = require("../config/database");

const Chapters = db.define("Chapters", {
    title: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    formation: {
        type: Sequelize.INTEGER,
        allowNull: false,
    }
});

db.sync({ forced: true });

module.exports = Chapters;
