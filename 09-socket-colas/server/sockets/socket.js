const { io } = require("../server");
const { TicketControl } = require("../classes/ticket-control");

const ticketControl = new TicketControl();

io.on("connection", (client) => {
  //1 argumento: "nombre de evento"
  //2 argumento: Callback:
  //2.1."Informacion a recibir"
  //2.2 argumento :"callback a ejecutar cuando termine" enviar el siguiente ticket enviado por parametro
  client.on("siguienteTicket", (data, callback) => {
    let siguiente = ticketControl.siguienteTicket();
    console.log("Siguiente: ", siguiente);
    callback(siguiente);
  });

  //EMitir estado actual cuando alguien se conecte al servidor
  client.emit("estadoActual", {
    actual: ticketControl.getUltimoTicket(),
    ultimos4: ticketControl.getUltimos4(),
  });
  //Atiende ticket
  client.on("atenderTicket", (data, callback) => {
    if (!data.escritorio) {
      return callback({
        err: true,
        message: "Escritorio es necesario",
      });
    }

    let atenderTicket = ticketControl.atenderTicket(data.escritorio);
    callback(atenderTicket);
    //Envia a todos
    client.broadcast.emit('ultimos4',{
      ultimos4:ticketControl.getUltimos4()
    })
  });
});
