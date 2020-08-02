require("./config/config");

const express = require("express");
//Importa mongoose para gestionar la base de datos
const mongoose = require("mongoose");
//Es una libreria propia de node que ayuda a resolver los path
const path = require("path");

//Declara una instancia de Express, la cual será nuestro servidor
const app = express();

//Permite extraer la informacion de cualquier payload que tengas las peticiones, la extrae en un objeto Json
const bodyParser = require("body-parser");
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

//Rutas:
//Habilitar la carpeta public para que pueda ser accedida por cualquiera 
//Es necesario utilizar el path.resolve ya que la carpeta esta afuera
app.use(express.static(path.resolve(__dirname, "../public")));

//Importa un enrutador global de rutas 
app.use(require("./routes/index.routes.js"));

//Realiza la conexion a la base de datos [protocolo]://[ruta]:[puerto]/[base de datos]
mongoose
  .connect(process.env.URLDB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then((res) => {
    console.log("Base de datos ONLINE");
  })
  .catch((err) => console.log("Error al conectar a la base de datos:", err));

app.listen(process.env.PORT, function () {
  console.log(`Escuchando en el puerto: ${process.env.PORT}!`);
});
