const Sequelize = require("sequelize");
const db = require("../config/database");

const UsersInfo = db.define("UsersInfo", {
	userId: {
		type: Sequelize.INTEGER,
		allowNull: false,
	},
	firstName: {
		type: Sequelize.STRING,
	},
	lastName: {
		type: Sequelize.STRING,
	},
	username: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	phone: {
		type: Sequelize.STRING,
	},
	avatar: {
		type: Sequelize.STRING,
		defaultValue: "/images/user.png"
	},
	bio: {
		type: Sequelize.STRING,
	},
	score: {
		type: Sequelize.INTEGER,
		allowNull: false,
		defaultValue: 0,
	},
	skills: {
		type: Sequelize.STRING,
	},
	facebook: {
		type: Sequelize.STRING,
	},
	twitter: {
		type: Sequelize.STRING,
	},
	github: {
		type: Sequelize.STRING,
	},
	linkedin: {
		type: Sequelize.STRING,
	},
	rank: {
		type: Sequelize.INTEGER,
	},
	lastLogin: {
		type: Sequelize.DATE,
	},
});

db.sync({ forced: true });

module.exports = UsersInfo;
