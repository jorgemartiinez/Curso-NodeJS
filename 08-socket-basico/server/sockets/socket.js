const { io } = require('../server');

io.on('connection', (client) => {
    console.log('Usuario conectado');

    client.emit('enviarMensaje',
        {
            usuario: 'Administrador',
            mensaje: 'Bienvenido a esta aplicacion'
        });

    client.on('disconnect', () => {
        console.log('Usuario desconectado');
    });

    // Escuchar el cliente
    client.on('enviarMensaje', (data, callback) => {

        client.broadcast.emit('enviarMensaje', data);
        console.log(data);
        // if (message.usuario) {
        //     callback({
        //         resp: 'TODO OK'
        //     }); // disparamos la función que nos envia el cliente si todo ha ido correctamente con la info que recibimos del mismo
        // } else {
        //     callback({
        //         resp: 'NOT OK'
        //     });
        // }
    });

});