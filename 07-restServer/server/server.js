require("./config/config")

const express = require("express");
const app = express();
//Permite extraer la informacion de cualquier payload que tengas las peticiones, la extrae en un objeto Json
const bodyParser = require("body-parser");

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

app.get("/usuario", function (req, res) {
  res.json("get usuario");
});

app.post("/usuario", (req, res) => {
  let body = req.body;
  if (body.nombre === undefined) {
      res.status(400).json({
          ok:false,
          mensaje:"Algo salio mal con el nombre"
      })
  } else {
    res.json({ metodo: "post usuario", body });
  }
});

//el id es un parametro dinamico
app.put("/usuario/:id", (req, res) => {
  let id = req.params.id;

  res.json({ metodo: "put usuario", id });
});

app.delete("/usuario", (req, res) => {
  res.json("delete usuario");
});

app.listen(process.env.PORT, function () {
  console.log(`Escuchando en el puerto: ${process.env.PORT}!`);
});
