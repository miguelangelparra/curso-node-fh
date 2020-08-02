const express=require('express')
const app = express()
//Rutas:
//Importa un enrutador definido en otro archivo
app.use(require("./usuarios.routes.js")); 
app.use(require('./login.routes'))


module.exports =app 