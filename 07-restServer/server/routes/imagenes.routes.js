const express = require("express");
const fs = require("fs");
const path = require("path");

const {verificaTokenImg} =require("../middlewares/autenticacion")

let app = express();
//La carpeta de imagenes no está en un directorio publico, por ello debemos hacer un metodo que logre buscarlas y devolverlas
app.get("/imagen/:tipo/:img",verificaTokenImg, (req, res) => {
  let tipo = req.params.tipo;
  let img = req.params.img;
  //El metodo sendFile requiere ruta absoluta, utilizamos path para ello
  //Crea un path para llegar a la imagen
  let pathImagen = path.resolve(__dirname, `../../uploads/${tipo}/${img}`);

  //Se debe verificar si el path del archivo existe, si no devolver uno por default, p
  //Para verificar usamos el fs.existSinc(path de archivo)
  if (fs.existsSync(pathImagen)) {
    res.sendFile(pathImagen);
  } else {
    //El metodo sendFile requiere ruta absoluta, utilizamos path para ello
    let pathNoImg = path.resolve(__dirname, "../assets/no-image.jpg");
    //El sendFile lee el content type del archivo y eso es lo que envia. Este metodo require de una ruta absoluta, se utiliza el path
    res.sendFile(pathNoImg);
  }
});

module.exports = app;
