const fs = require("fs");
const colors= require("colors")


let listarTabla = async(base,limite =10)=>{
  console.log("===================".green.bgMagenta)
  console.log(` Tabla del ${base}`.yellow)
  console.log("===================".red)
  let tabla=""
  for (let i = 0; i<=limite;i++){
   tabla += `${base}*${i}=${base*i}\n`
  }
  return tabla
}

let crearArchivo = (base,limite =10) => {
  return new Promise((resolve, reject) => {

    if(!Number(base)){
        reject("El archivo base no es un numero");
        return 
    }
    let data = "";

    for (let i = 0; i <= limite; i++) {
      data += `${base} X ${i} = ${base * i} \n`;
    }

    fs.writeFile(`tablas/tabla-${base}.txt`, data, (err) => {
      if (err) reject(err);
      else resolve(`tabla-${base}.txt`);
    });
  });
};

module.exports = {crearArchivo,listarTabla}
