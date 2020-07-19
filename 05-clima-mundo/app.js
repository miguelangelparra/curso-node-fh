const lugar = require("./lugar/lugar");
const clima = require("./clima/clima");

const argv = require("yargs").options({
  direccion: {
    alias: "d",
    desc: "Direccion de la ciudad para obtener el clima",
    demand: true,
  },
}).argv;
console.log(argv.direccion);

// lugar.getLugarLatLong(argv.direccion).then(console.log).catch(console.error);

//clima.getClima("-31", "33").then(console.log).catch(console.error);

const getInfo = async (direccion) => {
  try {
    const coordenadas = await lugar.getLugarLatLong(direccion);
    const temperatura = await clima.getClima(coordenadas.lat, coordenadas.lng);
    return `El clima de ${coordenadas.direccion} es ${temperatura}.`;
  } catch (e) {
    return `No se pudo determinar el clima de ${direccion}`;
  }
};

getInfo(argv.direccion).then(console.log).catch(console.log);
