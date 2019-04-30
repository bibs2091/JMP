const Sequelize = require("sequelize");
const db = require("../config/database");

const Courses = db.define("Courses", {
    category: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    cover: {
        type: Sequelize.STRING
    },
    level: {
        type: Sequelize.STRING
    },
    description: {
        type: Sequelize.STRING
    },
    author: {
        type: Sequelize.INTEGER
    },
    rating: {
        type: Sequelize.INTEGER
    },
    tags: {
        type: Sequelize.STRING
    }
});

db.sync({ forced: true });

module.exports = Courses;
