var socket = io();

var params = new URLSearchParams(window.location.search);
var usuario = {
  nombre: params.get("nombre"),
  sala: params.get("sala"),
};

//Verifica que se haya dado nombre y sala
if (!params.has("nombre") || !params.has("sala")) {
  //En caso contrario redirecciona al inicio
  window.location = "index.html";
  throw new Error("El nombre y la sala son necesarios");
}

socket.on("connect", function () {
  console.log("Conectado al servidor");

  socket.emit("entrarChat", usuario, function (resp) {
    console.log("Usuarios Conectados:", resp);
  });
});

// escuchar
socket.on("disconnect", function () {
  console.log("Perdimos conexión con el servidor");
});

// Enviar información
// socket.emit('enviarMensaje', {
//     mensaje: 'Hola Mundo'
// }, function(resp) {
//     console.log('respuesta server: ', resp);
// });

// Escucha el evento que dispara notificaciones de mensaje
socket.on("crearNotificacion", function (notificacion) {
  console.log(
    "Servidor:",
    notificacion.nombre,
    notificacion.mensaje,
    notificacion.fecha
  );
});

//Escucha el evento que se dispara cuando alguien entra o sale del chat
socket.on("listaDePersonas", function (personas) {
  console.log(personas);
});

//Mensajes privados

socket.on("mensajePrivado", function (mensaje) {
  console.log("Mensaje Privado: ", mensaje);
});
