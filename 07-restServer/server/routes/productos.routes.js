const express = require("express");
const { verificaToken } = require("../middlewares/autenticacion");

let app = express();
let Producto = require("../models/producto.model");
const productoModel = require("../models/producto.model");

//============Obtener Productos=========
app.get("/productos", verificaToken, (req, res) => {
  //Trae todos los productos
  //Populate usuario categoria
  //Paginado
  let desde = req.query.desde || 0;
  desde = Number(desde);
  let limite = req.query.limite || 10;
  limite = Number(limite);

  Producto.find({ disponible: true })
    .skip(desde)
    .limit(limite)
    .populate("usuario", "nombre email")
    .populate("categoria", "nombre descripcion")
    .exec((err, productosDB) => {
      if (err) {
        return res.status(500).json({
          ok: false,
          err: {
            message: "Error al buscar productos",
            err,
          },
        });
      }
      res.json({
        ok: true,
        productos: productosDB,
      });
    });
});

//============Obtener Producto por id =========
app.get("/productos/:id", verificaToken, (req, res) => {
  //Trae un producto por id
  //Populate usuario categoria
  // paginado
  let id = req.params.id;
  Producto.findById(id)
    .populate("usuario", "nombre email")
    .populate("categoria", "nombre descripcion")
    .exec((err, productoDB) => {
      if (err) {
        return res.status(500).json({
          ok: false,
          err,
        });
      }
      if (!productoDB) {
        return res.status(400).json({
          ok: false,
          err: { message: "Id de producto invalido" },
        });
      }

      res.json({
        ok: true,
        producto: productoDB,
      });
    });
});
//============Obtener Productos Busqueda=========
app.get("/productos/busqueda/:termino", verificaToken, (req, res) => {
  let termino = req.params.termino;
  let regex=new RegExp(termino,'i');
  Producto.find({ nombre: regex })
    .populate("categoria", "nombre")
    .exec((err, productos) => {
      if (err) {
        return res.status(500).json({
          ok: false,
          err: {
            message: "Error en la busqueda",
            err,
          },
        });
      }
      res.json({
        ok:true,
        productos
      })
    });
});
//============Crear  Producto  =========
app.post("/productos", verificaToken, (req, res) => {
  //Grabar usuario
  //grabar categoria , segun las categorias creadas
  let body = req.body;
  let usuario = req.usuario._id;
  let producto = new Producto({
    nombre: body.nombre,
    precioUni: body.precioUni,
    descripcion: body.descripcion,
    disponible: body.disponible,
    categoria: body.categoria,
    usuario,
  });

  producto.save((err, productoDB) => {
    if (err || !productoDB) {
      return res.status(500).json({
        ok: false,
        err,
      });
    }
    return res.status(201).json({
      ok: true,
      producto: productoDB,
    });
  });
});

//============Actualizar  Producto  =========
app.put("/productos/:id", verificaToken, (req, res) => {
  //Grabar usuario
  //grabar categoria , segun las categorias creadas
  let id = req.params.id;
  let body = req.body;
  Producto.findById(id, (err, productoDB) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        err: { message: "Operacion Fallida", err },
      });
    }
    if (!productoDB) {
      return res.status(400).json({
        ok: false,
        err: { message: "Producto no encontrado" },
      });
    }

    productoDB.nombre = body.nombre;
    productoDB.precioUni = body.precioUni;
    productoDB.categoria = body.categoria;
    productoDB.disponible = body.disponible;
    productoDB.descripcion = body.descripcion;

    productoDB.save((err, productoActualizado) => {
      if (err) {
        return res.status(500).json({
          ok: false,
          err,
        });
      }
      res.json({
        ok: true,
        producto: productoActualizado,
      });
    });
  });
});

//============Actualizar  Producto  =========
app.delete("/productos/:id", verificaToken, (req, res) => {
  //Grabar usuario
  //grabar categoria , segun las categorias creadas
  let id = req.params.id;
  Producto.findById(id, (err, productoDB) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        err: { message: "Operacion Fallida", err },
      });
    }
    if (!productoDB) {
      return res.status(400).json({
        ok: false,
        err: { message: "Producto no encontrado, ID no existe" },
      });
    }
    productoDB.disponible = false;
    productoDB.save((err, productoBorrado) => {
      if (err) {
        return res.status(500).json({
          ok: true,
          err,
        });
      }
      res.json({
        ok: true,
        producto: productoBorrado,
        message: "Producto Borrado",
      });
    });
  });
});

module.exports = app;
