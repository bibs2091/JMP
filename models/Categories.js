const Sequelize = require("sequelize");
const db = require("../config/database");

const Categories = db.define("Categories", {
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    description: {
        type: Sequelize.STRING,
        allowNull: false
    },
    cover: {
        type: Sequelize.INTEGER
    }
});

db.sync({ forced: true });

module.exports = Categories;
