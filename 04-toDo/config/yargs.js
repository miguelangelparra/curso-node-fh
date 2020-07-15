const descripcion = {
  demand: true,
  alias: "d",
  desc: "descripcion de la tarea",
};
const completado = {
  alias: "c",
  default: true,
  desc: "Marca como completado o pendiente de la tarea",
};

const argv = require("yargs")
  .command("crear", "Este comando crea una tarea", {
    descripcion,
  })
  .command("actualizar", "El comando permite actualizar las tareas", {
    descripcion,
    completado,
  })
  .command("borrar", "El comando permite borrar una tarea", {
    descripcion,
  })
  .help().argv;

module.exports = { argv };
