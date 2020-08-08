const express = require("express");
const app = express();
//Rutas:
//Importa un enrutador definido en otro archivo
app.use(require("./login.routes"));
app.use(require("./usuarios.routes.js"));
app.use(require("./categorias.routes"));
app.use(require("./productos.routes"));
app.use(require("./upload.routes"));
app.use(require("./imagenes.routes"))

module.exports = app;
