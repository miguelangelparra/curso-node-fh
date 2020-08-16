//Comando para establecer la conexion con el servidor
var socket = io();

var label = $("#lblNuevoTicket");

//Evento de Establecimiento de  comunicacion
socket.on("connect", () => {
  console.log("Conectado al servidor ");
});

//Evento de rutura en la  comunicacion
socket.on("disconnect", () => {
  console.log("Desconectado al servidor ");
});

//Evento que es emitido por el servidor al conectar para enviar la informacion actual al cliente
socket.on("estadoActual", (resp) => {
  console.log(resp);
  label.text(resp.actual);
});

//Listener del boton con JQuery
$("button").on("click", function () {
  console.log("click");
  //1 argumento: "nombre de evento"
  //2 argumento: "Informacion a enviar"
  //3 argumento :"callback a ejecutar cuando termine" recibe el siguiente ticket enviado por el server
  socket.emit("siguienteTicket", null, function (siguienteTicket) {
    label.text(siguienteTicket);
  });
});
