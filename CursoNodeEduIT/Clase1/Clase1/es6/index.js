console.log('Bienvenidos a Node.js')

var a = 5
var b = 8
var c = a + b
console.log(c)

console.log('-----------')

for(let i=0; i<5; i++) {
    console.log(i)
}
//console.log(i)

const Pi = Math.PI
//Pi = 2.345
console.log(Pi)


/* function dobleDe(a) {
    return a*2
} */
/*
const dobleDe = function(a) {
    return a*2
}
*/
const dobleDe = a => a*2
const sumar = (a,b) => a + b
//const getPi = () => Math.PI
const getPi = () => {
    console.log('calculando el valor de Pi')
    return Math.PI
}
const saludar = () => {
    console.log('Hola!!!!')
}

//const getInfoPersona = () => ({ nombre:'Ana' })
const getInfoPersona = () => {
    return { nombre:'Ana' }
}

console.log(dobleDe(13))
console.log(sumar(14,5))
console.log(getPi())
saludar()
console.log(getInfoPersona())




