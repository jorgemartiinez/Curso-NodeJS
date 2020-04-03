const jwt = require('jsonwebtoken');
// =====================
//  VERIFICAR TOKEN
// =====================
// next continuará con la ejecución del programa, hay que llamarla para que siga la ejecución o se quedará aquí el código
let verificaToken = (req, res, next) => {

    let token = req.headers.token; // obtenemos el token del header

    jwt.verify(token, process.env.SEED, (err, decode) => {

        if (err) {
            return res.status(401).json({
                ok: false,
                err: {
                    message: 'Token no válido'
                }
            })
        }

        req.usuario = decode.usuario;

        next();
    });

};

// =====================
//  VERIFICAR ADMIN ROL
// =====================

let verificaAdminRol = (req, res, next) => {

    let usuario = req.usuario;

    console.log(usuario.ROLE, 'es');
    if(usuario.role !== 'ADMIN_ROLE'){
        return res.status(403).json({
            ok: false,
            err: {
                message: 'Usuario no autorizado!'
            }
        })
    }

    next();
};

// =====================
//  VERIFICAR TOKEN PARA IMAGENES
// =====================
let verificaTokenImg = (req, res, next) => {

    let token = req.query.token; //TODO Este middleware podriamos ahorrarnoslo y añadir una condicion al verificaToken de arriba al obtener el param

    jwt.verify(token, process.env.SEED, (err, decode) => {

        if (err) {
            return res.status(401).json({
                ok: false,
                err: {
                    message: 'Token no válido'
                }
            });
        }

        req.usuario = decode.usuario;
        next();
    });

};

module.exports = { verificaToken, verificaAdminRol, verificaTokenImg };