const db = require('./conn');
const Sequelize = db.Sequelize;

const User = db.define('user', {
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
            notEmpty: true
        }
    }
});

module.exports = User;

