  let empleados = [
  {
    id: 1,
    nombre: "miguelangel",
  },
  {
    id: 2,
    nombre: "Melisa",
  },
  {
    id: 3,
    nombre: "Maria Cristina",
  },
];

let salarios = [
  {
    id: 1,
    salario: 1000,
  },
  {
    id: 3,
    salario: 2000,
  },
];

let getEmpleado = (id) => {
  return new Promise((resolve, reject) => {
    let empleadoDB = empleados.find((empleado) => empleado.id === id);
    if (!empleadoDB) {
      reject(`No  existe un empleado con el ID ${id}`);
    } else {
      resolve(empleadoDB);
    }
  });
};

let getSalario = (empleado) => {
  return new Promise((resolve, reject) => {
    let salarioDB = salarios.find((salario) => salario.id === empleado.id);
    if (!salarioDB) {
      return reject(`No se encontró un salario para ${empleado.nombre}`);
    } else {
      resolve({
        id: empleado.id,
        nombre: empleado.nombre,
        salario: salarioDB.salario,
      });
    }
  });
};

// getEmpleado(3).then(
//   empleado => {
//     //console.log(`Empleado de BD ${empleado.nombre}`);
//     getSalario(empleado).then(
//       (resp) => console.log(`El salario de ${resp.nombre} es ${resp.salario}`),
//       (err) => console.log(err)
//     );
//   },
//   (err) => console.log(err)
// );

//Promesas en cadena
getEmpleado(4)
  .then((empleado) => getSalario(empleado))
  .then(resp => console.log(`El salario de ${resp.nombre} es ${resp.salario}`))
  .catch(err=>console.log(err))
