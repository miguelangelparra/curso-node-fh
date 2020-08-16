const mensaje = 'Hola!'

let nombre = 'Lucas'
let mensaje2 = `Hola ${nombre}`

console.log(mensaje)
console.log(mensaje2)

const sumar = (a,b) => a + b
console.log(`La suma es ${sumar(5,9)}`)

class Persona {
    constructor(nombre,edad) {
        this.nombre = nombre
        this.edad = edad
    }
    getNombre() {
        return this.nombre
    }
    getEdad() {
        return this.edad
    }
}

const juan = new Persona('Juan', 24)
const ana = new Persona('Ana', 23)

console.log(juan.getNombre())
console.log(juan.getEdad())

console.log(ana.getNombre())
console.log(ana.getEdad())