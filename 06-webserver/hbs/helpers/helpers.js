//Importa la libreria HBS
const hbs = require("hbs");

//Helpers
//Indica una funcion que se puede renderizar cuando el codigo lo requira
hbs.registerHelper("getAnio", () => {
  return new Date().getFullYear();
});
hbs.registerHelper("capitalizar", (texto) => {
  let palabras = texto.split(" ");
  palabras.forEach((palabra, idx) => {
    palabras[idx] =
      palabra.charAt(0).toUpperCase() + palabra.slice(1).toLowerCase();
  });
  return palabras.join(" ");
});
