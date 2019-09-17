const Sequelize = require("sequelize");
const db = require("../config/database");

const Report = db.define("Report", {
    username: {
        type: Sequelize.STRING,
        allowNull: false
    },
    type: {
        type: Sequelize.STRING,
        allowNull: false
    },
    indictedType: {
        type: Sequelize.STRING,
        allowNull: false
    },
    indictedId: {
        type: Sequelize.INTEGER
    },
    indicted: {
        type: Sequelize.STRING,
        allowNull: false
    },
    reportDetails: {
        type: Sequelize.STRING
    },
    read:{
        type:Sequelize.BOOLEAN,
        defaultValue:false
    },

});

db.sync({ forced: true });

module.exports = Report;
