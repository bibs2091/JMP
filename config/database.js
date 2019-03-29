const Sequelize = require("sequelize");

const sequelize = new Sequelize("jmp_db", "mounir", "brah", {
	host: "localhost",
	dialect: "postgres",
	operatorsAliases: false,
	logging: false,
	// port: 5433,
	pool: {
		max: 5,
		min: 0,
		acquire: 30000,
		idle: 10000,
	},
});

module.exports = sequelize;
