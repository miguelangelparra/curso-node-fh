const operaciones = require('./api/operaciones')
const util = require('./util/retardos')


/* RETARDO SINCRÓNICO ( BLOQUEANTE ) */
/* 
console.log('Inicio de retardo....', Date.now())
util.retardoSync()
console.log('Fin de retardo....', Date.now())
*/

/* RETARDO ASINCRÓNICO - CALLBACK - ( NO BLOQUEANTE ) */
/* 
console.log('Inicio de retardo....', Date.now())
util.retardoCb( () => {
    console.log('Fin de retardo....', Date.now())
})
*/

/* RETARDO ASINCRÓNICO - PROMISE - ( NO BLOQUEANTE ) */
console.log('Inicio de retardo....', Date.now())
util.retardoPromise()
.then( () => console.log('Fin de retardo....', Date.now()))


console.log('Inicio de cálculos....')
console.log(operaciones.suma(10,3))
console.log(operaciones.resta(10,3))
console.log(operaciones.multiplicacion(10,3))
console.log(operaciones.division(10,3))
console.log(operaciones.resto(10,3))
console.log('Fin de cálculos....')

