const Sequelize = require("sequelize");
const db = require("../config/database");

const Quizs = db.define("Quizs", {
    title: {
        type: Sequelize.STRING
    },
    chapterId: {
        type: Sequelize.INTEGER
    },
    answer: {
        type: Sequelize.INTEGER
    }
});

db.sync({ forced: true });

module.exports = Quizs;
