const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.CLIENT_ID);

const app = express();

const Usuario = require('../models/usuario.model.js');

app.post('/login', (req, res) => {

    let body = req.body;

    Usuario.findOne({ email: body.email }, (err, usuarioDB) => { // condicion para comprobar que el email exista

        if (err) { // si tenemos algun error
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!usuarioDB) { // si el usuario no existe
            return res.status(400).json({
                ok: false,
                err: {
                    message: '(Usuario) o contraseña incorrectos.'
                }
            });
        }

        if (!bcrypt.compareSync(body.password, usuarioDB.password)) { // comprobamos las contraseñas
            return res.status(500).json({
                ok: false,
                err: {
                    message: 'Usuario o (contraseña) incorrectos.'
                }
            });
        }

        let token = jwt.sign({
            usuario: usuarioDB
        }, process.env.SEED, { expiresIn: 60 * 60 * 24 * 30 }) // expira en 30 dias

        res.json({
            ok: true,
            usuario: usuarioDB,
            token
        })

    });

});

app.post('/google', async (req, res) => {

    let token = req.body.idtoken;

    let googleUser = await verify(token)
        .catch(err => res.status(403).json({ ok: false, err }));

    Usuario.findOne({ email: googleUser.email }, (err, usuarioDB) => {
        if (err) { // si tenemos algun error
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (usuarioDB) { // si el usuario existe en la base de datos
            if (usuarioDB.google == false) { // si no se ha credo con google
                return res.status(400).json({
                    ok: false,
                    err: {
                        message: 'Debe de usar su autenticación normal'
                    }
                });
            }

            let token = jwt.sign({
                usuario: usuarioDB
            }, process.env.SEED, { expiresIn: 60 * 60 * 24 * 30 }) // creamos el token


            return res.json({
                ok: true,
                usuario: usuarioDB,
                token
            })

        } else { // el usuario no existe en nuestra base de datos
            let usuario = new Usuario();
            usuario.nombre = googleUser.nombre;
            usuario.email = googleUser.email;
            usuario.img = googleUser.img;
            usuario.google = true;
            usuario.password = ':)'; // la gente no se autenticará con password, con estos simbolos hara un hash y no se podrá acceder con ella

            usuario.save((err, usuarioDB) => {
                if (err) { // si tenemos algun error
                    return res.status(500).json({
                        ok: false,
                        err
                    });
                }

                let token = jwt.sign({
                    usuario: usuarioDB
                }, process.env.SEED, { expiresIn: 60 * 60 * 24 * 30 }) // creamos el token


                return res.json({
                    ok: true,
                    usuario: usuarioDB,
                    token
                })
            });
        }
    });
});

async function verify(token) {
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.CLIENT_ID,
    });
    const payload = ticket.getPayload();
    return {
        nombre: payload.name,
        email: payload.email,
        img: payload.picture,
        google: true
    }
}


module.exports = app;