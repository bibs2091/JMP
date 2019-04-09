const Sequelize = require("sequelize");
const db = require("../config/database");

const Projets = db.define("Projets", {
	nom: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	description: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	formationId: {
		type: Sequelize.INTEGER,
		allowNull: false,
	},
});

db.sync({ forced: true });

module.exports = Projets;
