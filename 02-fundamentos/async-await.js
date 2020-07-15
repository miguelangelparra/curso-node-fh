//La palavbra async vuelve a la funcion una promesa
let getNombre = async () => {
  //Perminte forzar el disparo de catch
  //undefined.nombre

  //   throw new Error(
  //     "Ocurrio un error en el ASync y este es un error seteado por mi "
  //   );

  return `Fernando`;
};
console.log(getNombre());

getNombre()
  .then((nombre) => console.log(nombre))
  .catch((e) => console.log("Error en el ASync", e));

//Esto es lo que hace el async por debajo
let getNombre2 = () => {
  return new Promise((resolve, reject) => {
    resolve("Fernando");
  });
};

let getNombre3 = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("Miguel");
    }, 3000);
  });
};

let saludo = async () => {
  let nombre = await getNombre3();
  return `hola ${nombre}`;
};

saludo().then(mensaje=>console.log(mensaje))
