const express = require("express");
const bcrypt = require("bcrypt");
const _ = require("underscore");
const app = express();
const Usuario = require("../models/usuario.model");

app.get("/usuario", function (req, res) {
  let desde = req.query.desde || 0;
  desde = Number(desde);
  let limite = req.query.limite || 5;
  //Convierte a numero
  limite = Number(limite);
  //Find permite buscar en el modelo de mongo, exec ejecuta el comando find,skip salta los registros, limit limita la cantidad de registros
  //El primer argumento es un objeto con las condiciones de filtrado. Sin ningun parametro no filtra
  //El segundo argumento es un string que indica los campos a devolver
  Usuario.find({estado:true}, "nombre email role estado google img")
    .skip(desde)
    .limit(limite)
    .exec((err, usuarios) => {
      if (err)
        return res.status(400).json({
          ok: false,
          err,
        });
      //count Cuenta los registros. el primer argumento indica la condicion, deberia ser la misma que en el find si hubiese
      Usuario.count({estado:true}, (err, conteo) => {
        res.json({ ok: true, usuarios, cuantos: conteo });
      });
    });
});

app.post("/usuario", (req, res) => {
  let body = req.body;

  let usuario = new Usuario({
    nombre: body.nombre,
    email: body.email,
    password: bcrypt.hashSync(body.password, 10),
    role: body.role,
  });

  usuario.save((err, usuarioDB) => {
    if (err) {
      return res.status(400).json({
        ok: false,
        err,
      });
    }
    //Una forma de alterar la devolucion del objeto creado por mongo
    // usuarioDB.password = null;

    res.json({ ok: true, usuario: usuarioDB });
  });
});

//el id es un parametro dinamico
app.put("/usuario/:id", (req, res) => {
  let id = req.params.id;
  //La funcion pick de underscore permite solo sacar las propiedades indicadas de un objeto
  let body = _.pick(req.body, ["nombre", "email", "img", "role", "estado"]);
  // Es una forma de evitar las actualizaciones de estos campos , pero es mejor utilizar la libreria underscore
  //delete body.password
  //delete body.google
  //new hace que devuelva el usuario actualizado, runvalidator hace que se ejecuten los validadores antes de actualizar
  Usuario.findByIdAndUpdate(
    id,
    body,
    { new: true, runValidators: true },
    (err, usuarioDB) => {
      if (err)
        return res.status(400).json({
          ok: false,
          err,
        });

      res.json({ metodo: "put usuario", usuario: usuarioDB });
    }
  );
});

app.delete("/usuario/:id", (req, res) => {
  let id = req.params.id;

  //Para borrar el registro fisicamente
  // Usuario.findByIdAndRemove(id, (err, usuarioBorrado) => {

  //Actualmente no se sugiere eliminar los registros sino cambiar un estado para indicar inactividad:
  let cambiaEstado = {
    estado: false,
  };
  Usuario.findByIdAndUpdate(
    id,
    cambiaEstado,
    { new: true },
    (err, usuarioBorrado) => {
      if (err) return res.status(400).json({ ok: false, err });
      if (!usuarioBorrado) {
        return res.status(400).json({
          ok: false,
          err: {
            message: "Usuario no encontrado",
          },
        });
      }
      res.json({
        ok: true,
        usuario: usuarioBorrado,
      });
    }
  );
});

module.exports = app;
