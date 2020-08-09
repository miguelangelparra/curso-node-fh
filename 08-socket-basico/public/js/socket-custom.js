    //Defino socket para poder llamarlo
    var socket = io();
    //Los ON son para escuchar eventos o sucesos. POr aqui se puede recibir informacion
    //Conecta al servidor. Establece una conexion con el Backend
    socket.on("connect", function () {
      console.log("Conectado al servidor");
    });

    //Evento que se ejecuta cuando se desconecta del servidor
    socket.on("disconnect", function () {
      console.log("Perdimos conexion con el servidor");
    });

    //Emitir un mensaje desde el cliente
    //Los EMIT son para enviar informacion
    //Primer argumento: Nombre de evento para el servidor
    //Segundo argumento: Mensaje a enviar
               // tercerargumento: callback que se dispara como retroalimentacion del servidor, sirve para confirmar

    socket.emit("enviarMensaje", {
      usuario: "Miguelangel",
      mensaje: "Hola Servidor",
    },function(resp){
        console.log("se disparo el callback, REspuesta del servidor:",resp)
    });

    //Definir un listener en el cliente para que pueda escuchar informacion enviada desde el servidor
    // Primer argumento: nombre del listener
    // segundo argumento: callback que recibe por parametro el mensaje emitido desde el servidor
    socket.on("enviarMensaje", function (mensaje) {
      console.log("Servidor:", mensaje);
    });