const Sequelize = require("sequelize");
const db = require("../config/database");

const Chapters = db.define("Chapters", {
    title: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    formation: {
        type: Sequelize.STRING,
        allowNull: false,
    }
});

db.sync({ forced: true });

module.exports = Chapters;
