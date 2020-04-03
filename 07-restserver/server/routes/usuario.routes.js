// express
const express = require('express');
const app = express();
//bcrypt
const bcrypt = require('bcrypt');
// underscore
const _ = require('underscore');
// modelo
const Usuario = require('../models/usuario.model.js');

const {verificaToken, verificaAdminRol} = require('../middlewares/auth');

/* RUTAS */


app.get('/usuario', function (req, res) {

    let desde = Number(req.query.desde) || 0; // parametro opcional, si la recibimos hacemos la query desde ese num, sino, desde el 0
    let limite = Number(req.query.limite) || 5;

    const condicion = {
        estado: true
    };

    Usuario.find(condicion, 'nombre email rol estado google imagen') // params a mostrar en la res
        .skip(desde) // parámetros a skipear, mostraremos desde estos, ej 5, empezaremos a mostrar a partir del 6
        .limit(limite) // a partir del parámetro de skip, muestra solo este num
        .exec((err, usuarios) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }
            Usuario.count(condicion, (err, conteo) => {
                res.json({
                    ok: true,
                    usuarios,
                    conteo
                });
            });
        });
});

app.post('/usuario', [verificaToken, verificaAdminRol], (req, res) => {
    let body = req.body;

    let usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        rol: body.role
    });

    usuario.save((err, usuarioDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            usuario: usuarioDB
        });
    });

});

app.put('/usuario/:id', [verificaToken, verificaAdminRol], (req, res) => {
    let id = req.params.id;
    // seleccionamos las propiedades del objeto que queremos que sean actualizadas
    let body = _.pick(req.body, ['nombre', 'email', 'img', 'role', 'estado']);

    Usuario.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, usuarioDB) => { // queremos regresar el objeto nuevo

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        if(!usuarioDB){
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            usuario: usuarioDB
        });

    });
});

app.delete('/usuario/:id', [verificaToken, verificaAdminRol], function (req, res) {
    let id = req.params.id;

    let cambiaEstado = {
        estado: false,
    };

    // Usuario.findByIdAndRemove(id, (err, usuarioBorrado) => {
    Usuario.findByIdAndUpdate(id, cambiaEstado, { new: true }, (err, usuarioBorrado) => { // cambiamos el estado a false para marcarlo como no disponible pero no lo borramos
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        if (!usuarioBorrado) {
            return res.status(400).json({
                ok: false,
                error: {
                    message: 'Usuario no encontrado'
                }
            });
        }

        return res.json({
            ok: true,
            usuario: usuarioBorrado
        });

    });

});

module.exports = app;