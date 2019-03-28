const Sequelize = require("sequelize");
const db = require("../config/database");

const WishLists = db.define('WishLists', {
    userId: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    formationId: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    addedAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
    }
});

db.sync({ forced: true });

module.exports = WishLists;