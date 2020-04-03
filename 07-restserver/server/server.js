require('./config/config');
const express = require('express');
const bodyParser = require('body-parser');
const moongose = require('mongoose');
const path = require('path');
const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use(require('./routes/index.routes.js'));

// habilitar carpeta public
app.use(express.static(path.resolve(__dirname, '../public')));

moongose.connect(process.env.URLDB, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }, (err, res) => {
    if (err) throw err;
    console.log('Base de datos ONLINE');
});

app.listen(process.env.PORT, () => console.log('Escuchando puerto', process.env.PORT));