const Sequelize = require("sequelize");
const db = require("../config/database");

const InfoSite = db.define("InfoSite", {
	nom: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	description: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	logo: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	email: {
		type: Sequelize.STRING,
		allowNull: false,
		isEmail: true,
	},
	adresse: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	inscription: {
		type: Sequelize.BOOLEAN,
		allowNull: false,
	},
	terms: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	lien_fcb: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	lien_insta: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	lien_twitter: {
		type: Sequelize.STRING,
		allowNull: false,
	},
});

db.sync({ forced: true });

module.exports = InfoSite;
