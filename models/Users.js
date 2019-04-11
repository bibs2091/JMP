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
	groudId: {
		type: Sequelize.INTEGER,
		allowNull: false,
		defaultValue: 2,
	},
	validated: {
		type: Sequelize.BOOLEAN,
		allowNull: false,
		defaultValue: false,
	},
});

db.sync({ forced: true });

module.exports = Users;
