const fs = require('fs');

class Ticket {
    constructor(numero, escritorio) {
        this.numero = numero;
        this.escritorio = escritorio;
    }
}

class TicketControl {

    constructor() {
        this.ultimo = 0;
        this.hoy = new Date().getDate();
        this.tickets = [];
        this.ultimos4 = [];

        let data = require('../data/data.json');

        if (data.hoy === this.hoy) {
            this.ultimo = data.ultimo;
            this.tickets = data.tickets;
            this.ultimos4 = data.ultimos4;
        } else {
            this.reiniciarCuenta();
        }
    }

    siguienteTicket() {
        this.ultimo += 1;
        let ticket = new Ticket(this.ultimo, null); // creamos un nuevo ticket, todavia no sabemos que mesa lo va a atender
        this.tickets.push(ticket);
        this.escribirArchivo();
        return `Ticket ${this.ultimo}`;
    }

    getUltimoTicket() {
        return `Ticket ${this.ultimo}`;
    }

    getUltimos4() {
        return this.ultimos4;
    }

    atenderTicket(escritorio) {

        if (this.tickets.length === 0) { // no hay tickets por atender
            console.log('No hay tickets');
        }
        let numeroTicket = this.tickets[0].numero; // cogemos el primer ticket
        this.tickets.shift(); // eliminamos el elemento

        let atenderTicket = new Ticket(numeroTicket, escritorio);
        this.ultimos4.unshift(atenderTicket);
        if(this.ultimos4.length > 4){
            this.ultimos4.splice(-1, 1); // borramos el ultimo, no queremos que haya mas de 4
        }
        console.log('Ultimos 4', this.ultimos4);
        this.escribirArchivo();
        return atenderTicket;
    }

    reiniciarCuenta() {
        this.ultimo = 0;
        this.tickets = []; // tickets en cola
        this.ultimos4 = [];
        console.log('Se ha inicializado el sistema');
        this.escribirArchivo();
    }

    escribirArchivo() {
        let jsonData = {
            ultimo: this.ultimo,
            hoy: this.hoy,
            tickets: this.tickets, // tickets pendientes de atender
            ultimos4: this.ultimos4
        };
        let jsonDataString = JSON.stringify(jsonData); // para guardarlo lo convertimos a string
        fs.writeFileSync('./server/data/data.json', jsonDataString);
    }

}

module.exports = {
    TicketControl
};