const Sequelize = require("sequelize");
const db = require("../config/database");

const Progress = db.define("Progress", {
    userId: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    courseId: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    state: {
        type: Sequelize.STRING
    },
    lastLecture: {
        type: Sequelize.INTEGER,
    }
});

db.sync({ forced: true });

module.exports = Progress;
