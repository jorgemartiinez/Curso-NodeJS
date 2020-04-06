import mysql = require('mysql');

class MySQL {

    private static _instance: MySQL;
    connection: mysql.Connection;
    private connected: boolean;

    constructor() {
        console.log('Clase inicializada');
        this.connected = false;
        this.connection = mysql.createConnection({
            host: 'localhost',
            user: 'node_user',
            password: '1234',
            database: 'node_db'
        });
        this.conectarDB();
    }

    private conectarDB() {
        this.connection.connect((err: mysql.MysqlError) => {
            if (err) {
                console.log('Se ha producido un error al conectar a la db', err.message);
                return;
            }
            this.connected = true;
            console.log('Base de datos online');
        });
    }

    public static get instance() {
        return this._instance || (this._instance = new this()); // si existe la instancia creala, si no, llama al constructor y almacena toda la clase en la instancia
    }

    // tengo que comprobar que la clase esté inicializada antes de llamar al método
    static ejecutarQuery(query: string, callback: Function) {
        this._instance.connection.query(query, (err, results: Object[], fields) => {

            if (err) {
                console.log('Error en query');
                return callback(err);
            }

            if (results.length === 0) {
                callback('El registro solicitado no existe');
            }
            callback(null, results); // no hay error, mandamos los resultados

        });
    }

}

export default MySQL;