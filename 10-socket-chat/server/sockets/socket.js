const { io } = require('../server');
const { Usuarios } = require('../classes/Usuarios');
const { crearMensaje } = require('../utils/utils');

const usuarios = new Usuarios();

io.on('connection', (client) => {

    console.log('Usuario conectado', client.id);

    client.on('entrarChat', function (data, callback) {

        if (!data.nombre || !data.sala) {
            return callback({
                error: true,
                mensaje: 'El nombre/sala es necesario'
            });
        }

        client.join(data.sala); // nos unimos a la sala de mensajes

        usuarios.agregarPersona(client.id, data.nombre, data.sala); // con el id del socket

        client.broadcast.to(data.sala).emit('listaPersonas', usuarios.getPersonasPorSala(data.sala));
        client.broadcast.to(data.sala).emit('crearMensaje', crearMensaje('Administrador', `${data.nombre} se unió.`));

        console.log('usuarios por sala', usuarios.getPersonasPorSala(data.sala));
        callback(usuarios.getPersonasPorSala(data.sala)); // mandamos los usuarios actuales
    });

    client.on('crearMensaje', (data, callback) => {

        let persona = usuarios.getPersona(client.id);
        let mensaje = crearMensaje(persona.nombre, data.mensaje);
        client.broadcast.to(persona.sala).emit('crearMensaje', mensaje); // enviar mensaje a la sala

        callback(mensaje);

    });

    client.on('disconnect', () => {
        let personaBorrada = usuarios.borrarPersona(client.id); // borramos el usuario de nuestro array si se ha desconectado
        console.log('La persona borrada es', personaBorrada);
        client.broadcast.to(personaBorrada.sala).emit('crearMensaje', crearMensaje('Administrador', `${personaBorrada.nombre} salió.`));
        client.broadcast.to(personaBorrada.sala).emit('listaPersonas', usuarios.getPersonasPorSala(personaBorrada.sala));
    });

    // mensajes privados
    client.on('mensajePrivado', (data) => {

        let persona = usuarios.getPersona(client.id);
        client.broadcast.to(data.para).emit('mensajePrivado', crearMensaje(persona.nombre, data.mensaje));

    });

});