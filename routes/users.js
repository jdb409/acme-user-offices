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

router.put('/:id', (req, res, next) => {
    
    return Promise.all([User.findById(req.params.id), Office.findById(req.body.officeId)])
        .then(userOffice => {            
            userOffice[0].setOffice(userOffice[1])
            res.send({
                user: userOffice[0],
                office: userOffice[1]
            });
            
        });
})

router.delete('/:id', (req, res, next) => {
    console.log('hello123');
    console.log(req.params.id)
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