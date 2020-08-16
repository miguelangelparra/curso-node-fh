const fs = require("fs");

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
    //Tickts pendientes
    this.tickets = [];
    //
    this.ultimos4 = [];

    //Carga la data historica
    let data = require("../data/data.json");

    //Verifica si es el mismo dia y carga la data, si no resetea todo
    if (data.hoy === this.hoy) {
      //Carga el historial en caso de que haya ocurrido algo con el servidor
      this.ultimo = data.ultimo;
      this.tickets = data.tickets;
      this.ultimos4 = data.ultimos4;
    } else {
      this.reiniciarConteo();
    }
  }

  siguienteTicket() {
    this.ultimo += 1;

    //Crea una nueva instancia de un ticket
    let ticket = new Ticket(this.ultimo, null);
    //Agrega a la cola de tickets
    this.tickets.push(ticket);

    this.grabarArchivoHistorico();
    return `Ticket: ${this.ultimo}`;
  }

  getUltimoTicket() {
    return `Ticket: ${this.ultimo}`;
  }

  getUltimos4() {
    return this.ultimos4;
  };
  

  atenderTicket(escritorio) {
    if (this.tickets.length === 0) {
      return {
        ok: false,
        message: "No hay tickets",
      };
    }
    //Obtiene el ticket mas viejo de la cola
    let numeroTicket = this.tickets[0].numero;
    //Elimina el ticket mas viejo
    this.tickets.shift();
    let atenderTicket = new Ticket(numeroTicket, escritorio);
    //Agrega al inicio del arreglo de los ultimos 4 llamados
    this.ultimos4.unshift(atenderTicket);
    //Se evalua si solo hay 4 o menos
    if (this.ultimos4.length > 4) {
      //Borra la ultima posicion
      this.ultimos4.splice(-1, 1);
    }
    console.log(this.ultimos4)
    //Actualiza el archivo historico
    this.grabarArchivoHistorico();
    return atenderTicket;
  }

  grabarArchivoHistorico() {
    let jsonData = {
      ultimo: this.ultimo,
      hoy: this.hoy,
      tickets: this.tickets,
      ultimos4: this.ultimos4,
    };

    let jsonDataString = JSON.stringify(jsonData);
    fs.writeFileSync("./server/data/data.json", jsonDataString);
  }

  //PAra resetear el archivo historico de la data y los tickets en cache
  reiniciarConteo() {
    this.ultimo = 0;
    this.tickets = [];
    this.ultimos4 = [];

    console.log("Se ha inicializado el sistema");
    this.grabarArchivoHistorico();

    //Para evitar que el nodemon se actualice cuando graba el archivo:
    // nodemon server/server -e js,html
  }
}

module.exports = {
  TicketControl,
};
