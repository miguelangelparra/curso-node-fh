const express = require("express");
const app = express();
//Rutas:
//Importa un enrutador definido en otro archivo
app.use(require("./login.routes"));
app.use(require("./usuarios.routes.js"));
app.use(require("./categorias.routes"));
app.use(require("./productos.routes"));

module.exports = app;
