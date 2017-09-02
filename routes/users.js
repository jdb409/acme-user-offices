const router = require('express').Router();
const { User, Office } = require('../db/index')

router.get('/', (req, res, next) => {
    User.findAll()
        .then(users => {
            res.send(users);
        })
        .catch(next);
});

router.post('/', (req, res, next) => {

    return User.create({
        name: req.body.name
    })
        .then(user => {
            res.send(user);
        })

})

router.delete('/:id', (req, res, next) => {
    return User.destroy({
        where: {
            id: req.params.id
        }
    }).then(user => {
        res.send({
            user: user
        });
    })
})

module.exports = router;