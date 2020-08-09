const express = require("express");
const socketIO = require("socket.io");
//SocketIO corre sobre el HTTP de node
const http = require("http");

const path = require("path");

const app = express();
// Se puede pasar el app como argumento al server para que la configuracion que le hagamos al express se hagan efectivas en nuestro servidor de http
let server = http.createServer(app);

const publicPath = path.resolve(__dirname, "../public");
const port = process.env.PORT || 3000;

app.use(express.static(publicPath));

//De esta manera se inicializa el socket
//Esta es la comunicacion con el backend
//utilizamos module.exports para poder utilizar la variable io en otros archivos del servidor
module.exports.io = socketIO(server);
//Se requiere el archivo donde se tiene toda la logica del socket
require("./sockets/socket");

//El servidor que realmente se va a montar es el de http
server.listen(port, (err) => {
  if (err) throw new Error(err);

  console.log(`Servidor corriendo en puerto ${port}`);
});
