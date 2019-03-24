const Sequelize = require("sequelize");

const sequelize = new Sequelize('jmp', 'oussama', 'toor', {
    host: 'localhost',
    dialect: 'postgres',
    operatorsAliases: false,
    port: 5433,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});

module.exports = sequelize;