const argv = require("./config/yargs").argv
const colors= require("colors/safe")
const { crearArchivo, listarTabla } = require("./multiplicar/multiplicar");

let comando = argv._[0];

switch (comando) {
  case "listar":
    console.log("listar");
    listarTabla(argv.base, argv.limite)
      .then((tabla) => console.log(tabla))
      .catch((e) => console.log(e));
    break;
  case "crear":
    console.log("crear");
    crearArchivo(argv.base,argv.limite)
      .then((archivo) =>
        console.log(`El archivo fue creado con exito`, colors.red( archivo))
      )
      .catch((e) => console.log(e));
    break;
  default:
    console.log("comando no reconocido");
}

//MODO A MANO SIN YARGS
//Recibe argumentos desde la ejecucion
// console.log(process.argv)
//ejecutando node app.js --base=5
// let argv= process.argv
// let parametroBase= argv[2].split("=")[1]
// let base = parametroBase
