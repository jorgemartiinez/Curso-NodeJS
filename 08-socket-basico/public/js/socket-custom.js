var socket = io();

// Escuchar información del server
socket.on('connect', function () {
    console.log('Conectado al servidor');
});
socket.on('disconnect', function () {
    console.log('Perdimos conexión con el servidor');
});

// Enviar información al server
socket.emit('enviarMensaje', { usuario: 'Jorge', mensaje: 'Tete' }, function (resp) { // la función como tercer argumento es para recibir la respuesta del server
    console.log('respuesta server' + resp.resp);
});

// escuchar información
socket.on('enviarMensaje', function (data) {
    console.log('Recibimos enviar mensaje del servidor', data);
});