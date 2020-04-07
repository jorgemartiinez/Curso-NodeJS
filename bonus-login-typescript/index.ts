import Server from './classes/server';
import mainRouter from './routes/index.routes';
import moongose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';

const server = new Server(); // importamos el server y ejecutamos su constructor

// Middleware body parser
server.app.use(bodyParser.urlencoded({ extended: true }));
server.app.use(bodyParser.json());

// Configurar cors
server.app.use(cors({ origin: true, credentials: true }));

// Rutas de mi app
server.app.use('/api', mainRouter);

// Conectar db
moongose.connect('mongodb://localhost:27017/fotosgram',
    { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true },
    (err) => {
        if (err)
            throw err;
        console.log('Base de datos online');
    });

server.start(() => {
    console.log(`Servidor corriendo en puerto ${server.port}`);
});