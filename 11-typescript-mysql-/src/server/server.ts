import express = require('express');
import path = require('path');

export class Server {

    public app: express.Application;
    public port: number;

    constructor(port: number) {
        this.port = port;
        this.app = express();
    }

    static init(port: number) { // dispara el constructor e inicializa todo
        return new Server(port);
    }

    start(callback: () => void) {
        this.app.listen(this.port, callback);
        this.publicFolder(); // usa la ruta pública
    }

    private publicFolder() {
        const publicPath = path.resolve(__dirname, '../public');
        this.app.use(express.static(publicPath));
    }
}