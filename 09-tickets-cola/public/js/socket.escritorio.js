// Comando para establecer la conexión
var socket = io();

var searchParams = new URLSearchParams(window.location.search); // queremos obtener el escritorio por url
if (!searchParams.has('escritorio')) { // si no tenemos el parámetro escritorio, nos movemos a la pantalla anterior
    window.location = 'index.html';
    throw new Error('EL escritorio es necesario');
}

var escritorio = searchParams.get('escritorio');

var label = $('small');

$('h1').text('Escritorio ' + escritorio);
$('button').on('click', function () {

    socket.emit('atenderTicket', { escritorio: escritorio }, function (resp) {
        if(resp === 'No hay tickets'){
            label.text('No hay mas tickets');
            alert('No hay mas tickets');
            return;
        }
        label.text('Ticket ' + resp.numero);
    });

});