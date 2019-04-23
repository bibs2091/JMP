const Sequelize = require("sequelize");
const db = require("../config/database");

const WishLists = db.define('WishLists', {
    userId: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    courseId: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
});

db.sync({ forced: true });

module.exports = WishLists;