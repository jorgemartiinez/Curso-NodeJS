// comando para establecer la conexión
var socket = io();
var label = $('#lblNuevoTicket');
socket.on('connect', function () {
    console.log('conectado al servidor');
});

socket.on('disconnect', function () {
    console.log('Desconectado del servidor');
});

socket.on('estadoActual', (resp) => {
    console.log('Estado actual', resp.actual);
    $('#lblNuevoTicket').text(resp.actual);
});

$('button').on('click', function () {
    socket.emit('siguienteTicket', 'message', function (siguienteTicket) {
        $('#lblNuevoTicket').text(siguienteTicket);
    });
});