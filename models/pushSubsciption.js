const Sequelize = require('sequelize')
const db = require('../config/database')

const PushSubs = db.define("PushSubs", {
    userId: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    subKey: {
        type: Sequelize.JSONB,
        allowNull: false
    }
});

db.sync({ forced: true })

module.exports = PushSubs