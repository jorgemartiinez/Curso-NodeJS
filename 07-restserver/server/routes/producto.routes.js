const express = require('express');

let { verificaToken } = require('../middlewares/auth');
let { verificaAdminRol } = require('../middlewares/auth');
// underscore
const _ = require('underscore');
const Producto = require('../models/producto.model');

const app = express();



// OBTENER PRODUCTO PAGINADO CON EL POPULATE DE CADA COLECCION
app.get('/producto', (req, res) => {
    console.log('hola');
    let desde = Number(req.query.desde) || 0;
    let hasta = Number(req.query.hasta) || 10;

    Producto.find({ disponible: true})
        .skip(desde)
        .limit(hasta)
        .populate('usuario', 'nombre email')
        .populate('categoria', 'nombre')
        .exec((err, productoDB) => {

            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            if (!productoDB) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }

            return res.json({
                ok: true,
                productos: productoDB
            });

        });

});
// BUSCAR PRODUCTO
app.get('/producto/buscar/:termino', verificaToken, (req, res) => {

    let termino = req.params.termino;
    let regex = new RegExp(termino, 'i'); // no sea case sensitive y no haga falta completar todas la palabras para las búsquedas

    Producto.find({ nombre: regex, disponible: true }) // buscamos el producto por termino
        .populate('categoria', 'nombre')
        .exec((err, productoDB) => {

            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            return res.json({
                ok: true,
                producto: productoDB
            });
        });

});


// OBTENER PRODUCTO POR ID
app.get('/producto/:id', (req, res) => {

    Producto.findById(req.headers.id)
        .populate('usuario', 'nombre email')
        .populate('categoria', 'nombre')
        .exec((err, productoDB) => {

            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            if (!productoDB) {
                return res.status(404).json({
                    ok: false,
                    err: {
                        message: 'Producto no encontrado'
                    }
                });
            }

            return res.json({
                ok: true,
                producto: productoDB
            });
        });

});

// añadir nuevo producto
app.post('/producto', verificaToken, (req, res) => {

    let body = req.body;

    let producto = new Producto({
        nombre: body.nombre,
        precioUni: body.precioUni,
        descripcion: body.descripcion,
        categoria: body.categoria,
        usuario: req.usuario._id
    });

    producto.save((err, productoDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!productoDB) {
            return res.status(404).json({
                ok: false,
                err: {
                    message: 'Producto no encontrado'
                }
            });
        }

        return res.json({
            ok: true,
            producto: productoPopulate
        });

    });

});

// editar producto por id
app.put('/producto/:id', [verificaToken, verificaAdminRol], (req, res) => {

    let params = req.params;
    let body = _.pick(req.body, ['nombre', ['precioUni', 'descripcion', 'disponible', 'categoria']]);

    Producto.findByIdAndUpdate(params.id, body, { useFindAndModify: false, new: true, runValidators: true }, (err, productoDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!productoDB) {
            return res.status(404).json({
                ok: false,
                err: {
                    message: 'Producto no encontrado',
                    err
                }
            });
        }

        return res.json({
            ok: true,
            producto: productoDB
        });

    });

});

// no borrar fisicamente, sino cambiar el disponible a false
app.delete('/producto/:id', [verificaToken, verificaAdminRol], (req, res) => {
    let id = req.params.id;

    let cambiaEstado = {
        disponible: false,
    };

    Producto.findByIdAndUpdate(id, cambiaEstado, { useFindAndModify: false, new: true }, (err, productoBorrado) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!productoBorrado) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        return res.json({
            ok: true,
            producto: productoBorrado
        });

    });
});

module.exports = app;

