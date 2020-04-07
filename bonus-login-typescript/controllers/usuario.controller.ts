import { Request, Response } from 'express';
import { Usuario, IUsuario } from '../models/usuario.model';
import bcrypt from 'bcryptjs';
import Token from './../classes/Token';

export default class UsuarioController {
    constructor() { }

    static async login(req: Request, res: Response) {
        let body = req.body;

        try {
            const userDB = await Usuario.findOne({ email: body.email });

            if (!userDB) {
                return res.json({
                    ok: false,
                    mensaje: 'Usuario/contraseña incorrectos'
                });
            }

            if (userDB.compararPassword(body.password)) {

                const tokenUser = Token.getJwtToken({
                    _id: userDB._id,
                    nombre: userDB.nombre,
                    email: userDB.email,
                    avatar: userDB.avatar
                });

                return res.json({
                    ok: false,
                    token: tokenUser
                });

            } else {
                return res.json({
                    ok: false,
                    mensaje: 'Usuario/contraseña incorrectos'
                });
            }

        } catch (err) {
            UsuarioController.handleError(err, res);
        }
    }

    static async create(req: Request, res: Response) {

        let body = req.body;

        const user = {
            nombre: body.nombre,
            email: body.email,
            password: bcrypt.hashSync(body.password, 10),
        };

        try {
            const newUser = await Usuario.create(user);

            const tokenUser = Token.getJwtToken({
                _id: newUser._id,
                nombre: newUser.nombre,
                email: newUser.email,
                avatar: newUser.avatar
            });

            return res.json({
                ok: false,
                token: tokenUser
            });


        } catch (err) {
            UsuarioController.handleError(err, res);
        }

    }

    static async update(req: any, res: Response) {

        let body = req.body;
        let usuarioDelToken = req.usuario;

        const user = {
            nombre: body.nombre || usuarioDelToken.nombre,
            email: body.email || usuarioDelToken.email,
            avatar: req.body.avatar || usuarioDelToken.avatar,
        };

        try {
            const userDB = await Usuario.findByIdAndUpdate(usuarioDelToken._id, user, { new: true });

            if (!userDB) { return res.json({ ok: false, mensaje: 'No existe un usuario con ese id' }); }

            // generamos un nuevo token por si ha cambiado algún valor
            const tokenUser = Token.getJwtToken({
                _id: userDB._id,
                nombre: userDB.nombre,
                email: userDB.email,
                avatar: userDB.avatar
            });

            return res.json({
                ok: true,
                newUser: userDB,
                token: tokenUser
            });

        } catch (err) {
            UsuarioController.handleError(err, res);
        }

    }

    static handleError(err: any, res: Response) {
        return res.json({
            ok: false,
            err: {
                err
            }
        });
    }
}