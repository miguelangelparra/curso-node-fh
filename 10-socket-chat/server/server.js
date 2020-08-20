const express = require('express');
const socketIO = require('socket.io');
const http = require('http');
//necesario para resolver los problemas de enrutamiento
const path = require('path');

//Instancia de Express
const app = express();
// Se requiere crear una instancia de httpServer para pasarla a la libreria socket.io
let server = http.createServer(app);

//Resuelve el problema del path dinamico para referenciar un espacio fisico
const publicPath = path.resolve(__dirname, '../public');
const port = process.env.PORT || 3000;

//Permite la entrada a la carpeta publica 
app.use(express.static(publicPath));

// IO = esta es la comunicacion del backend
//Exporta la referencia de io
module.exports.io = socketIO(server);
//Importa el archivo correspondiente al modulo de socket que creamos custom
require('./sockets/socket');





server.listen(port, (err) => {

    if (err) throw new Error(err);

    console.log(`Servidor corriendo en puerto ${ port }`);

});