//Importa la referencia a la  funcion de los socket declarada en server.js, la cual ya tiene como argumento el servidor http que estamos creando
const { io } = require("../server");
//Trae la clase controladora
const { Usuarios } = require("../classes/usuario");
//Crea una instancia de la clase controladora
const usuarios = new Usuarios();
//Importa funciones genericas para reutilizar y escalar
const { crearMensaje } = require("../utils/utils");

//Evento cuando se establece una conexion
//El id del cliente es unico por usuario que se conecte al servidor
io.on("connection", (client) => {
  //se dispara cuando entra un usuario
  client.on("entrarChat", (usuario, callback) => {
    //Valida que el nombre no esté vacio
    if (!usuario.nombre || !usuario.sala) {
      return callback({
        error: true,
        mensaje: "El nombre es necesario",
      });
    }

    //El join hace que se conecte a una sala especifica
    client.join(usuario.sala);
    //Agrega a  la persona a la lista de conectados y retorna la lista de los conectados
    usuarios.agregarPersona(client.id, usuario.nombre, usuario.sala);

    // //Emite un mensaje a todos para actualizar la lista de personas conectadas
    // client.broadcast.emit("listaDePersonas", usuarios.getPersonas());
    // Los clientes se conectan por default a una sala global, para emitir solo a una sala se debe asociar
    //El cliente a dicha sala, el nombre de la sala es arbitrario y el envio de los mensajes sigue la misma logica
    //Que los mensajes privados cliente-cliente

    // //Emite un mensaje a todos para actualizar la lista de personas conectadas
    //Con el to(misala) Se envia solo a aquellos que estan asociados a una sala
    client.broadcast
      .to(usuario.sala)
      .emit("listaPersonas", usuarios.getPersonasPorSala(usuario.sala));
    // Para comunicar que alguien se ha contectado a la sala
    client.broadcast
      .to(usuario.sala)
      .emit(
        "crearMensaje",
        crearMensaje("Administrador", `${usuario.nombre} Entró al chat`)
      );
    //Devuelve la lista de usuarios conectados
    return callback(usuarios.getPersonasPorSala(usuario.sala));
  });

  client.on("crearMensaje", (data, callback) => {
    //identifica a la persona que envio el mensaje
    let persona = usuarios.getPersona(client.id);
    //Crea el mensaje y lo emite a todos
    let mensaje = crearMensaje(persona.nombre, data.mensaje);
    client.broadcast.to(persona.sala).emit("crearMensaje", mensaje);
    callback(mensaje);
  });

  client.on("mensajePrivado", (data) => {
    //identifica el emisor
    let persona = usuarios.getPersona(client.id);
    //Crea el mensaje y lo emite a un solo usuario.
    //Esto es posible con el to(id del cliente receptor)
    let mensaje = crearMensaje(persona.nombre, data.mensaje);
    client.broadcast.to(data.idpara).emit("crearMensaje", mensaje);
  });
  //Evento que escucha la desconexion. Borra la persona a partir del id del cliente socket que emitio el evento
  client.on("disconnect", () => {
    let personaBorrada = usuarios.deletePersona(client.id);
    //Notifica a todos los usuarios que el cliente se desconectó
    client.broadcast
      .to(personaBorrada.sala)
      .emit(
        "crearMensaje",
        crearMensaje(
          "Administrador",
          `${personaBorrada.nombre} abandonó el chat`
        )
      );
    //Emite un mensaje a todos para actualizar la lista de personas conectadas
    client.broadcast
      .to(personaBorrada.sala)
      .emit("listaPersonas", usuarios.getPersonasPorSala(personaBorrada.sala));
  });
});
