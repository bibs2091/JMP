const Sequelize = require("sequelize");
const db = require("../config/database");

const Message = db.define("Message", {
	from: {
		type: Sequelize.INTEGER,
		allowNull: false,
	},
	to: {
		type: Sequelize.INTEGER,
		allowNull: false,
	},
	text: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	isRead: {
		type: Sequelize.BOOLEAN,
		defaultValue: false,
	},
});
