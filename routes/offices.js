const router = require('express').Router();
const { User, Office } = require('../db/index')

router.get('/', (req, res, next) => {
    Office.findAll({
        include: {
            model: User
        }
    })
        .then(offices => {
            res.send(offices);
        })
})

router.post('/', (req, res, next) => {
    console.log('hello');
    return Office.create({
        name: req.body.add,
        lng: req.body.lng,
        lat: req.body.lat
    }).then(office => {
        res.send(office);
    })
})

router.delete('/:officeId', (req, res, next) => {
    
    return Office.destroy({
        where: {
            id: req.params.officeId
        }
    }).then(()=>{
        res.send('hello');
    })
})

module.exports = router;