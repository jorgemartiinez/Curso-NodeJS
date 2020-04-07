import { Request, Response, NextFunction } from 'express';
import Token from '../classes/Token';

export const verificaToken = (req: any, res: Response, next: NextFunction) => {

    const userToken = req.get('x-token') || ''; // obtenemos el token de los headers

    Token.comprobarToken(userToken)
        .then((decoded: any) => {
            console.log(decoded);
            req.usuario = decoded;
            next(); // puede continua con el siguiente paso
        })
        .catch(err => {
            // aquí no queremos que continue

            res.json({
                ok: false,
                mensaje: 'Token no es correcto'
            });

        });

}