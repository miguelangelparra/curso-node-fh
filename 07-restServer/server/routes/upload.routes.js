const express = require("express");

const fileUpload = require("express-fileupload");
const fs = require("fs");
const path = require("path");

const app = express();
const Usuario = require("../models/usuario.model");
const Producto = require("../models/producto.model");

//Middleware que Habilita la subida de archivo
//Todos los archivos que se suban quedaran en req.files
app.use(fileUpload({ useTempFiles: true }));

app.put("/upload/:tipo/:id", (req, res) => {
  let tipo = req.params.tipo;
  let id = req.params.id;

  if (!req.files) {
    return res.status(400).json({
      ok: false,
      err: {
        message: "No se ha seleccionado ningun archivo ",
      },
    });
  }

  //Validar tipo
  let tiposValidos = ["productos", "usuarios"];
  if (tiposValidos.indexOf(tipo) < 0) {
    return res.status(400).json({
      ok: false,
      err: {
        message: "Los tipos permitidos son:" + tiposValidos.join(" ,"),
      },
    });
  }

  //Obtiene archivo
  let archivo = req.files.archivo;
  //Saca la extension del archivo
  let nombreArchivoCortado = archivo.name.split(".");
  let extension = nombreArchivoCortado[nombreArchivoCortado.length - 1];

  //EXtensiones Permitidas
  let extensionesValidas = ["png", "jpg", "gif", "jpeg"];
  //Valida las extensiones permitidas
  if (extensionesValidas.indexOf(extension) < 0) {
    return res.status(400).json({
      ok: false,
      err: {
        message:
          "Las extensiones permitidas son: " + extensionesValidas.join(" ,"),
        extensionRecibida: extension,
      },
    });
  }

  //Cambiar nombre al archivo para que sea unico
  let nombreArchivo = `${id}-${new Date().getMilliseconds()}.${extension}`;

  //MV es mover
  //REcibe un path donde se guardará el archvo
  archivo.mv(`uploads/${tipo}/${nombreArchivo}`, (err) => {
    if (err)
      return res.status(500).json({
        ok: false,
        err,
      });

    //Aqui la imagen está cargada
    switch (tipo) {
      case "usuarios":
        imagenUsuario(id, res, nombreArchivo);
      case "productos":
        imagenProducto(id, res, nombreArchivo);
      default:
        return;
    }
  });
});

//Puedo pasar el res ya que JS siempre pasa los objetos por referencia
function imagenUsuario(id, res, nombreArchivo) {
  Usuario.findById(id, (err, usuarioBD) => {
    if (err) {
      //Es necesario borrar el archivo del servidor si ocurre un error para no tener imagenes basura
      borraArchivo(nombreArchivo, "usuarios");
      return res.status(500).json({
        ok: false,
        err,
      });
    }

    if (!usuarioBD) {
      //Es necesario borrar el archivo del servidor si ocurre el usuario no existe para no tener imagenes basura
      borraArchivo(nombreArchivo, "usuarios");
      borraArchivo(nombreArchivo, "usuarios");
      return res.status(400).json({
        ok: false,
        err: {
          message: "Usuario no existe",
        },
      });
    }
    //Funcion para borrar archivos
    borraArchivo(usuarioBD.img, "usuarios");
    //Carga el nomrbe del archivo a la propiedad del usuario
    usuarioBD.img = nombreArchivo;
    //Guarda el usuario modificado
    usuarioBD.save((err, usuarioGuardado) => {
      res.json({
        ok: true,
        usuario: usuarioGuardado,
        img: nombreArchivo,
      });
    });
  });
}

function imagenProducto(id, res, nombreArchivo) {
  Producto.findById(id, (err, productoDB) => {
    if (err) {
      //Es necesario borrar el archivo del servidor si ocurre un error para no tener imagenes basura
      borraArchivo(nombreArchivo, "productos");
      return res.status(500).json({
        ok: false,
        err,
      });
    }

    if (!productoDB) {
      //Es necesario borrar el archivo del servidor si ocurre el usuario no existe para no tener imagenes basura
      borraArchivo(nombreArchivo, "productos");
      borraArchivo(nombreArchivo, "productos");
      return res.status(400).json({
        ok: false,
        err: {
          message: "Producto no existe",
        },
      });
    }
    //Funcion para borrar archivos
    borraArchivo(productoDB.img, "producto");
    //Carga el nomrbe del archivo a la propiedad del usuario
    productoDB.img = nombreArchivo;
    //Guarda el usuario modificado
    productoDB.save((err, productoGuardado) => {
      res.json({
        ok: true,
        producto: productoGuardado,
        img: nombreArchivo,
      });
    });
  });
}

function borraArchivo(nombreImagen, tipo) {
  //Crea un path para llegar a la imagen
  let pathImagen = path.resolve(
    __dirname,
    `../../uploads/${tipo}/${nombreImagen}`
  );
  //Confirma si el archivo existe, Devuelve true o false
  //fs.exists funciona con callback
  //fs.exitsSync funciona de forma sincrona
  if (fs.existsSync(pathImagen)) {
    //Borra archivos
    fs.unlinkSync(pathImagen);
    // es necesario validar si existe el archivo, en caso de que intente borrar un archivo de un path que no existe arrojará un error
  }
}
module.exports = app;
