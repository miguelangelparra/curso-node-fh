//Se requiere importar la variable IO desde el serchivo server.js
const { io } = require("../server");
//Para saber cuando alguien se conecta, la callback recibe como primer parametro la informacion de la conexion que se ha establecido
io.on("connection", (client) => {
  console.log("usuario conectado");
  //Para enviar un mensaje al cliente
  client.emit("enviarMensaje", {
    usuario: "Administrado",
    mensaje: "Bienvenido a esta aplicacion",
  });
  //Para saber cuando un usuario se desconecta
  client.on("disconnect", () => {
    console.log("usuario desconectado");
  });

  //PAra escuchar al cliente
  //Primer argumento: Nombre de evento, es un listener
  //SEgundo argumento : Callback que recibe como parametro el mensaje enviado por el cliente, el segundo argumento de la funcion ees un callback que se dispara para retroalimentar al cliente
  client.on("enviarMensaje", (data, callback) => {
    console.log(data);
    //Broadcast es una propiedad de todos los clientes
    //Broadcast permite emitir a todos los clientes
    client.broadcast.emit("enviarMensaje", data);

    //   if (data.usuario) {
    //     callback({
    //       res: "Todo salio bien ",
    //     });
    //   } else {
    //     callback({
    //       res: "Todo salio mal!!!! ",
    //     });
    //   }
  });
});
