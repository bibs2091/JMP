const Sequelize = require("sequelize");
const db = require("../config/database");

const Suggestions = db.define("Suggestions", {
    quizId: {
        type: Sequelize.INTEGER
    },
    content: {
        type: Sequelize.STRING
    }
});

db.sync({ forced: true });

module.exports = Suggestions;
