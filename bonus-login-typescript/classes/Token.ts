import jwt from 'jsonwebtoken';

export default class Token {

    private static seed: string = 'este-es-el-seed-de-mi-app-secreto';
    private static caducidad: string = '30d';

    constructor() { }

    static getJwtToken(payload: any): string { // el payload es lo que queremos que esté dentro del token
        return jwt.sign(payload, this.seed, { expiresIn: this.caducidad });
    }

    static comprobarToken(token: string) { // método para comprobar token, funciona en base a callbacks, aquí los pasamos a promesas
        return new Promise((resolve, reject) => {
            jwt.verify(token, this.seed, (err, decoded) => { // decoded tiene la info del payload del token
                if (err) { // no valido
                    reject(); // manejarlo en el catch
                } else { // valido
                    resolve(decoded);
                }
            });
        });
    }

}