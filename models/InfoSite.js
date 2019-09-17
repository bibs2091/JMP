const Sequelize = require("sequelize");
const db = require("../config/database");

const InfoSite = db.define("InfoSite", {
	nom: {
		type: Sequelize.STRING
	},
	description: {
		type: Sequelize.STRING
	},
	logo: {
		type: Sequelize.STRING
	},
	email: {
		type: Sequelize.STRING,
		isEmail: true
	},
	adresse: {
		type: Sequelize.STRING
	},
	inscription: {
		type: Sequelize.BOOLEAN
	},
	registration_message: {
		type: Sequelize.STRING,
		allowNull: true
	},
	terms: {
		type: Sequelize.STRING
	},
	lien_fcb: {
		type: Sequelize.STRING
	},
	lien_insta: {
		type: Sequelize.STRING
	},
	lien_twitter: {
		type: Sequelize.STRING
	},
});

db.sync({ forced: true });

module.exports = InfoSite;
