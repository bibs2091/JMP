const Sequelize = require("sequelize");
const db = require("../config/database");

const Notification = db.define("Notification", {
    text: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    generated: {
        type: Sequelize.DATE,
        defaultValue: Date.now(),
    },
    isRead: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    }
});

db.sync({ forced: true });

module.exports = Notification;
