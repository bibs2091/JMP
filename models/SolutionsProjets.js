const Sequelize = require("sequelize");
const db = require("../config/database");

const SolutionsProjets = db.define('SolutionsProjets', {
    étudiantId: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    projetId: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    validé: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    },
    submitedAt: {
        type: Sequelize.DATE
    }
});

db.sync({ forced: true });

module.exports = SolutionsProjets;