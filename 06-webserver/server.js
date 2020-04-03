const express = require('express');
const app = express();

// hbs
const hbs = require('hbs');
require('./hbs/helpers/helpers'); // requerimos el archivo donde se registran los helpers

const port = process.env.PORT || 3000; // si existe, coge el puerto de heroku, si no el local que es 3000

// midleware con la función express.static, cargará los archivos por defecto desde dentro de /public
app.use(express.static(__dirname + '/public'));

// express HBS engine
hbs.registerPartials(__dirname + '/views/partials'); // registramos la carpeta donde estan los parciales
app.set('view engine', 'hbs'); // queremos usar el motor de templates HBS

app.get('/', (req, res) => {
    res.render('home', {
        nombre: 'jorge martínez'
    });
});


app.get('/about', (req, res) => {
    res.render('about');
});

app.get('/data', (req, res) => {
    res.send('Hola Data');
});

app.listen(port, () => {
    console.log(`Escuchando peticiones en el puerto ${ port }`);
});