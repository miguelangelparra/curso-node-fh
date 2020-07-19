//Importa la libreria express
const express = require("express");
//Referencia la funcion express
const app = express();
//Importa la libreria HBS
const hbs = require("hbs");
//Importa los helpers custom
require("./hbs/helpers/helpers")
//Puerto
const port = process.env.PORT || 3000

//Vuelve la carpeta "public" de manera estatica ( Esto es un middleware)
app.use(express.static(__dirname + "/public"));

//Express HBS Engine
// agrega el seteo necesario para que el express renderice dinamicamente las paginas hbs
app.set("view engine", "hbs");
//Le indica a HBS cual es la ruta donde se encuentran los Partials.
hbs.registerPartials(__dirname + "/views/partials");

//RUTAS
app.get("/", (req, res) => {
  //Renderiza el archivo home.hbs ubicado en la carpeta ./views, esto es posible por el hbs, el primer parametro es el nombre del archivo y el segundo es un objeto con las variables dinamicas
  res.render("home", { nombre: "Miguelangel parra " });
});

app.get("/about", (req, res) => {
  res.render("about");
});
// Indica que si es consultado el path se debe ejecutar el callback
app.use("/hola", (req, res) => {
  res.send("Hola Mundo! De nuevo");
});

app.use("/mijson", (req, res) => {
  let salida = {
    nombre: "Miguelangel",
    telefono: 1123123,
  };
  //Identifica que la respuesta es un objeto y realiza el JSON.stringify por nosotros
  res.send(salida);
});
//Escucha en el puerto indicado
app.listen(port, () => console.log(`corriendo en el ${port}`));

// para que el nodemon esté pendiente de otro tipo de  archivos $ nodemon server.js -e js,hbs
