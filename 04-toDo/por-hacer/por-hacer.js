const fs = require("fs");
const colors = require("colors");

let listadoPorHacer = [];

const cargarDB = () => {
  try {
    listadoPorHacer = require("../db/data.json");
  } catch (error) {
    listadoPorHacer = [];
  }
};

const getListado = () => {
  cargarDB();
  return listadoPorHacer;
};

const guardarDB = () => {
  let data = JSON.stringify(listadoPorHacer);
  fs.writeFile("db/data.json", data, (err) => {
    if (err) throw new Error("Error al guardar");
  });
};

const crear = (descripcion) => {
  cargarDB();
  let porHacer = {
    descripcion,
    completado: false,
  };
  listadoPorHacer.push(porHacer);
  guardarDB();
  return porHacer;
};

const actualizar = (descripcion, completado = true) => {
  cargarDB();

  let index = listadoPorHacer.findIndex(
    (tarea) => tarea.descripcion === descripcion
  );

  if (index >= 0) {
    listadoPorHacer[index].completado = completado;
    guardarDB();
    return true;
  } else {
    return false;
  }
};

const borrar = (descripcion) => {
  cargarDB();
  let nuevoListado = listadoPorHacer.filter(
    (tarea) => tarea.descripcion !== descripcion
  );
  if (listadoPorHacer.length === nuevoListado.length) {
    return false;
  } else {
    listadoPorHacer = nuevoListado;
    guardarDB();
    return true;
  }
};
module.exports = {
  crear,
  getListado,
  actualizar,
  borrar,
};
