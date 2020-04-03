const express = require('express');
const socketIO = require('socket.io'); // no trabaja directamente con express http://localhost:3000/socket.io/socket.io.js probar funcionamiento
const http = require('http'); // modulo que ya trae node por defecto

const path = require('path');

const app = express();
let server = http.createServer(app); // creamos el servidor con la aplicación app de express

const publicPath = path.resolve(__dirname, '../public');
const port = process.env.PORT || 3000;

app.use(express.static(publicPath));

// io = esta es la comunicación del backend
module.exports.io = socketIO(server); // lo importamos
require('./sockets/socket');

server.listen(port, (err) => {
    if (err) throw new Error(err);
    console.log(`Servidor corriendo en puerto ${port}`);
});