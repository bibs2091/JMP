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
	title: {
		type: Sequelize.STRING,
	},
	text: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	isRead: {
		type: Sequelize.BOOLEAN,
		defaultValue: false,
	},
	date: {
		type: Sequelize.DATE,
	},
	delSender: {
		type: Sequelize.BOOLEAN,
		default: false
	},
	delReciever: {
		type: Sequelize.BOOLEAN,
		default: false
	}
});

db.sync({ forced: true });

module.exports = Message;
