const db = require('./conn');
const User = require('./User');
const Office = require('./Office');

User.belongsTo(Office);
Office.hasMany(User);

const sync = () => {
    return db.sync({ force: true })
};

const seed = () => {
    return Promise.all([
        User.create({ name: 'Bob' }),
        User.create({ name: 'Gus' }),
        Office.create({ name: 'NYC' }),
        Office.create({ name: 'NJ' })
    ]).then(([user1, user2, office, office2]) => {
    })
}


module.exports = { sync, seed, User, Office };
