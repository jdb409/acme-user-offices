const db = require('./conn');
const Sequelize = db.Sequelize;

const Office = db.define('office', {
    name: {
        type: Sequelize.STRING
    },
    lat: Sequelize.FLOAT,
    lng: Sequelize.FLOAT
})

module.exports = Office;