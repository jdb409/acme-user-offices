const express = require('express');
const path = require('path');
const nunjucks = require('nunjucks');
const app = express();
const port = process.env.PORT || 3000;
const db = require('./db/index');
const bodyParser = require('body-parser');

app.set('view engine', 'html');
app.engine('html', nunjucks.render);
nunjucks.configure('views', { noCache: true });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use('/vendor', express.static(path.join(__dirname, 'node_modules')));
app.use('/source', express.static('source'));

app.get('/', (req, res, next) => {
    res.render('index');
});


app.use('/users', require('./routes/users'));
app.use('/offices', require('./routes/offices'));

app.use('/', (err, req, res, next) => {
    res.send(err);
})

db.sync()
    .then(() => {
        console.log('synched');
        return db.seed()
            .then(() => {
                console.log('seeded');
                app.listen(port, () => {
                    console.log(`listening on ${port}`);
                })
            })
    })

