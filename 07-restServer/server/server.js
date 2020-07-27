require("./config/config");

const express = require("express");
//Importa mongoose para gestionar la base de datos
const mongoose = require("mongoose");

//Declara una instancia de Express, la cual será nuestro servidor
const app = express();

//Permite extraer la informacion de cualquier payload que tengas las peticiones, la extrae en un objeto Json
const bodyParser = require("body-parser");
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

//Rutas:
//Importa un enrutador definido en otro archivo
app.use(require("./routes/usuarios.routes.js"));

//Realiza la conexion a la base de datos [protocolo]://[ruta]:[puerto]/[base de datos]
mongoose
  .connect(process.env.URLDB, {
    useNewUrlParser: true,
    useCreateIndex:true,
    useUnifiedTopology: true,
  })
  .then((res) => {
    console.log("Base de datos ONLINE");
  })
  .catch((err) => console.log("Error al conectar a la base de datos:", err));

app.listen(process.env.PORT, function () {
  console.log(`Escuchando en el puerto: ${process.env.PORT}!`);
});
