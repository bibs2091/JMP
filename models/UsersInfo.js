const Sequelize = require("sequelize");
const db = require("../config/database");

const UsersInfo = db.define('UsersInfo', {
    userId: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    firstName: {
        type: Sequelize.STRING
    },
    lastName: {
        type: Sequelize.STRING
    },
    userName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    numTéléphone: {
        type: Sequelize.STRING
    },
    avatar: {
        type: Sequelize.STRING
    },
    bio: {
        type: Sequelize.STRING
    },
    score: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    skills: {
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
    lien_github: {
        type: Sequelize.STRING
    },
    classement: {
        type: Sequelize.INTEGER
    },
    lastLogin: {
        type: Sequelize.DATE
    }
});

db.sync({ forced: true });

module.exports = UsersInfo;
