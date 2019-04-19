const Sequelize = require("sequelize");
const db = require("../config/database");

const Users = db.define("Users", {
	email: {
		type: Sequelize.STRING,
		notNull: true,
		isEmail: true,
	},
	password: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	groupId: {
		type: Sequelize.INTEGER,
		allowNull: false,
		defaultValue: 3,
	},
});

db.sync({ forced: true });

module.exports = Users;
