const opciones = {
  base: {
    demand: true,
    alias: "b",
  },
  limite: {
    alias: "l",
    default: 10,
  },
};

const argv = require("yargs")
  .command("listar", "Esto permite listar la tabla de multiplicar", opciones)
  .command(
    "crear",
    "Esto permite crear un archivo con la tabla de multiplicar",
    opciones
  )
  .help().argv;
//Ejecutando node app listar -b 65 --limite 20
console.log(argv);

module.exports = {argv}