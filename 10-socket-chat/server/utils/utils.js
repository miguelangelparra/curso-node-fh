//Modulo de funciones genericas reutilizables:

//Funcion generica que recibe un nombre y un mensaje, para returnar un objeto con los mismos más el timestamp
const crearMensaje = (nombre, mensaje)=>{
console.log(nombre,mensaje)
    return {
        nombre,
        mensaje,
        fecha:new Date().getTime()
    }
}

module.exports={
    crearMensaje
}