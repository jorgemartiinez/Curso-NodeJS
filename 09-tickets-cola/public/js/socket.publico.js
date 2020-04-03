var socket = io();

socket.on('estadoActual', function(resp){
    console.log(resp);

    actualizaHTML(resp);

});

socket.on('ultimos4', function(data){
    const audio = new Audio('../audio/new-ticket.mp3');
    audio.play();
    actualizaHTML(data);
});

function actualizaHTML(data) {
    data.ultimos4.forEach((element, index) => {
        $(`#lblTicket${index+1}`).text("Ticket " + element.numero);
        $(`#lblEscritorio${index+1}`).text("Escritorio " + element.escritorio);
    });
}