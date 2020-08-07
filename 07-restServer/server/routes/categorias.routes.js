const express = require("express");
const {
  verificaToken,
  verificaAdmin_Role,
} = require("../middlewares/autenticacion");
let Categoria = require("../models/categoria.model");
const _ = require("underscore");
let app = express();

//Encuentra categorias
app.get("/categoria", verificaToken, (req, res) => {
  //Sort Ordena segun la propiedad indicada
  //El populate busca la informacion segun los objectId y la completa, el primer argumento es el parametro para aplicar el populate y el segundo son las propiedades que quiero ver de ese objeto. Si no tiene el segundo argumento se popula todo el objeto
  Categoria.find({ estado: true }).sort('nombre').populate('usuario', 'nombre email').exec((err, categoriasDB) => {
    if (err) {
      return res.status(400).json({ ok: false, err });
    }
    Categoria.count({ estado: true }, (err, contados) => {
      if (err) {
        return res.status(400, json({ ok: false, err }));
      }
      return res.json({ ok: true, categorias: categoriasDB, contados });
    });
  });
});

//Encuentra una categoria especifica
app.get("/categoria/:id", (req, res) => {
  let id = req.params.id;

  Categoria.findById(id).exec((err, categoriaDB) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        err,
      });
    }
    if (!categoriaDB) {
      return res.status(400).json({
        ok: false,
        err: { messages: "Id inexistente" },
      });
    }
    return res.json({
      ok: true,
      categoria: categoriaDB,
    });
  });
});
//Crea una categoria
app.post("/categoria", verificaToken, (req, res) => {
  let { nombre, descripcion } = req.body;

  let categoria = new Categoria({
    nombre,
    descripcion,
    usuario: req.usuario._id,
  });

  categoria.save((err, categoriaDB) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        err,
      });
    }
    //Confirma si efectivamente se creo una categoria
    if (!categoriaDB) {
      return res.status(500).json({
        ok: false,
        err,
      });
    }
    return res.json({ ok: true, categoria: categoriaDB });
  });
});
//Modifica una categoria
app.put("/categoria/:id", (req, res) => {
  let id = req.params.id;
  let categoria = _.pick(req.body, ["nombre", "descripcion"]);
  Categoria.findByIdAndUpdate(
    id,
    categoria,
    { new: true, runValidatps: true },
    (err, categoriaActualizada) => {
      if (err) {
        return res.status(500).json({
          ok: false,
          err: {
            message: "Operacion Fallida",
          },
        });
      }
      if (!categoriaActualizada) {
        return res.status(400).json({
          ok: false,
          err: {
            message: "Categoria no encontrada",
          },
        });
      }
      return res.json({
        ok: true,
        metodo: "put categoria",
        categoria: categoriaActualizada,
      });
    }
  );
});
// Borra una categoria
app.delete(
  "/categoria/:id",
  [verificaToken, verificaAdmin_Role],
  (req, res) => {
    let id = req.params.id;
    console.log(id);
    Categoria.findByIdAndRemove(id, (err, categoriaBorrada) => {
      if (err) {
        return res.status(500).json({
          ok: false,
          err: {
            message: "Operacion Fallida",
          },
        });
      }
      if (!categoriaBorrada) {
        return res.status(400).json({
          ok: false,
          err: {
            message: "Categoria no encontrada",
          },
        });
      }
      return res.json({
        ok: true,
        categoria: categoriaBorrada,
        message: "Categoria Borrada",
      });
    });
  }
);

module.exports = app;
