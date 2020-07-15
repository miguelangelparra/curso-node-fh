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

let getEmpleado = (id, callback) => {
  let empleadoDB = empleados.find((empleado) => empleado.id === id);
  if (!empleadoDB) {
    callback(`No  existe un empleado con el ID ${id}`);
  } else {
    callback(null, empleadoDB);
  }
};

let getSalario = (empleado, callback) => {
  let salarioDB = salarios.find((salario) => salario.id === empleado.id);
  if (!salarioDB) {
    return callback(`No se encontró un salario para ${empleado.nombre}`);
  } else {
    callback(null, {
      id: empleado.id,
      nombre: empleado.nombre,
      salario: salarioDB.salario,
    });
  }
};

getEmpleado(1, (err, empleado) => {
  if (err) {
    return console.log(err);
  }
  getSalario(empleado, (err, res) => {
    if (err) {
      return console.log(err);
    }
    console.log(`El salario de ${res.nombre} es de ${res.salario} $`);
  });
});
