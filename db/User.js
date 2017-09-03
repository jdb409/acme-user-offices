const db = require('./conn');
const Sequelize = db.Sequelize;

const User = db.define('user', {
    name: {
        type: Sequelize.STRING,
        unique: true
    }
});

module.exports = User;

