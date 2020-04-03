const express = require('express');
let app = express();

let { verificaToken } = require('../middlewares/auth');
let { verificaAdminRol } = require('../middlewares/auth');

let Categoria = require('../models/categoria.model');

// MOSTRAR CATEGORIAS, mostrar todas las categorias
app.get('/categoria', (req, res) => {

    Categoria.find({})
        .sort('descripcion') // ordena las categorias por la descripcion
        .populate('usuario', 'nombre email') // populate con la relacion entre colecciones categoria y usuario, en cat tenemos el id del user
        .exec((err, categoriaDB) => {

            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            if (!categoriaDB) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }

            return res.json({
                ok: true,
                categorias: categoriaDB
            });
        });
});

// MOSTRAR CATEGORIA POR ID, devolverla
app.get('/categoria/:id', (req, res) => {

    let params = req.params; // el parámetro id está en la url

    Categoria.findById(params.id).exec((err, categoriaDB) => {

        console.log('retorno', categoriaDB);
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!categoriaDB) {
            return res.status(404).json({
                ok: false,
                err: {
                    message: 'Categoria no encontrada'
                }
            });
        }

        return res.json({
            ok: true,
            categoria: categoriaDB
        });

    });

});

// EDITAR UNA CATEGORIA
app.put('/categoria/:id', [verificaToken, verificaAdminRol], (req, res) => {

    let params = req.params; // el parámetro id está en la url

    Categoria.findByIdAndUpdate(params.id, req.body, { new: true }, (err, categoriaDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!categoriaDB) {
            return res.status(404).json({
                ok: false,
                err: {
                    message: 'Categoria no encontrada'
                }
            });
        }

        return res.json({
            ok: true,
            categoria: categoriaDB
        });

    });


});


// CREAR UNA CATEGORIA, devolverla
app.post('/categoria', verificaToken, (req, res) => {
console.log(req);

    let categoria = new Categoria({
        descripcion: req.body.descripcion,
        usuario: req.usuario._id,
    });


    categoria.save((err, categoriaDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!categoriaDB) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        return res.json({
            ok: true,
            categoria: categoriaDB
        });

    });

});

// BORRAR UNA CATEGORIA
app.delete('/categoria/:id', [verificaToken, verificaAdminRol], (req, res) => {

    Categoria.findByIdAndDelete(req.params.id, (err, categoriaDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!categoriaDB) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        return res.json({
            ok: true,
            categoria_borrada: categoriaDB
        });
    });

});

module.exports = app;