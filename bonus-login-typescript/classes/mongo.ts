import moongose, { Mongoose } from 'mongoose';

export default class Mongo {

    private _url: string;
    private _config: moongose.ConnectionOptions;
    private static _instance: any;

    constructor() {
        this._url = 'mongodb://localhost:27017/fotosgram';
        this._config = {
            useNewUrlParser: true,
            useCreateIndex: true,
        }
        this._connectDB();
    }

    public static get instance() {
        return this._instance || (this._instance = new this()); // si existe la instancia creala, si no, llama al constructor y almacena toda la clase en la instancia
    }

    private _connectDB() {
        moongose.connect(this._url, this._config, (err) => {

            if (err) {
                throw err;
            }
            console.log('Base de datos online');
        });
    }
}