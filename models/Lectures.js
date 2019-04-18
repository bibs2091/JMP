const Sequelize = require("sequelize");
const db = require("../config/database");

const Lectures = db.define("Lectures", {
    title: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    chapter: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    type: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    link: {
        type: Sequelize.STRING
    },
    description: {
        type: Sequelize.STRING
    }
});

db.sync({ forced: true });

module.exports = Lectures;
