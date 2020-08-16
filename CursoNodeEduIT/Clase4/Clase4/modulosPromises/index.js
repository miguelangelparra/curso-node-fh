const operaciones = require('./api/operaciones')
const retardo = require('./util/retardos')
const suma = require('./util/sumas')

/* ---------------------------------------------------------------- */
/*                        PRUEBA RETARDO                            */
/* ---------------------------------------------------------------- */
/* RETARDO SINCRÓNICO ( BLOQUEANTE ) */
function retardoSync() {
    console.log('Inicio de retardo...')
    console.time('retardo')
    retardo.sync()
    console.timeEnd('retardo')
    console.log('Fin de retardo!')
}

/* RETARDO ASINCRÓNICO - CALLBACK - ( NO BLOQUEANTE ) */
function retardoAsyncCb() {
    console.log('Inicio de retardo...')
    console.time('retardo')
    retardo.cb( () => {
        console.timeEnd('retardo')
        console.log('Fin de retardo!')
    })
}

/* RETARDO ASINCRÓNICO - PROMISE - THEN/CATCH ( NO BLOQUEANTE ) */
//function retardoAsyncPromiseThenCatch() {
const retardoAsyncPromiseThenCatch = () => {    
    console.log('Inicio de retardo...')
    console.time('retardo')
    retardo.promise()
    .then( () => {
        console.timeEnd('retardo')
        console.log('Fin de retardo!')
    })
}

/* RETARDO ASINCRÓNICO - PROMISE - ASYNC/AWAIT ( NO BLOQUEANTE ) */
//async function retardoAsyncPromiseAsyncAwait() {
const retardoAsyncPromiseAsyncAwait = async () => {    
    console.log('Inicio de retardo...')
    console.time('retardo')
    await retardo.promise()
    console.timeEnd('retardo')
    console.log('Fin de retardo!')
}

//retardoAsyncPromiseAsyncAwait()

/* ---------------------------------------------------------------- */
/*                         PRUEBA SUMA                              */
/* ---------------------------------------------------------------- */
/* SUMA SINCRÓNICA ( BLOQUEANTE ) */
function sumaSync() {
    let r = suma.sync(2,1,2e9,'suma sync')
    r = suma.sync(2,r,2e9,'suma sync')
    r = suma.sync(2,r,2e9,'suma sync')
    r = suma.sync(2,r,2e9,'suma sync')
    r = suma.sync(2,r,2e9,'suma sync')
}

/* SUMA ASINCRÓNICA - CALLBACK - ( NO BLOQUEANTE ) */
function sumaAsyncCb() {
    suma.cb(2,1,1000,'suma cb 1', r => {
        suma.cb(2,r,1000,'suma cb 1', r => {
            suma.cb(2,r,1000,'suma cb 1', r => {
                suma.cb(2,r,1000,'suma cb 1', r => {
                    suma.cb(2,r,1000,'suma cb 1', r => {
                    })
                })
            })
        })
    })

    suma.cb(2,1,3000,'suma cb 2', r => {
        suma.cb(2,r,1000,'suma cb 2', r => {
            suma.cb(2,r,1000,'suma cb 2', r => {
                suma.cb(2,r,1000,'suma cb 2', r => {
                    suma.cb(2,r,1000,'suma cb 2', r => {
                    })
                })
            })
        })
    })

}

/* SUMA ASINCRÓNICA - PROMISE - THEN/CATCH ( NO BLOQUEANTE ) */
function sumaAsyncPromiseThenCatch() {
    suma.promise(2,1,1000,'suma promise tc 1')
    .then( r => suma.promise(2,r,1000,'suma promise tc 1'))
    .then( r => suma.promise(2,r,1000,'suma promise tc 1'))
    .then( r => suma.promise(2,r,1000,'suma promise tc 1'))
    .then( r => suma.promise(2,r,1000,'suma promise tc 1'))
    //.catch( error => console.log(error))
    .catch(console.log)

    suma.promise(2,1,3000,'suma promise tc 2')
    .then( r => suma.promise(2,r,1000,'suma promise tc 2'))
    .then( r => suma.promise(2,r,1000,'suma promise tc 2'))
    .then( r => suma.promise(2,r,1000,'suma promise tc 2'))
    .then( r => suma.promise(2,r,1000,'suma promise tc 2'))
    //.catch( error => console.log(error))
    .catch(console.log)

}

/* SUMA ASINCRÓNICA - PROMISE - ASYNC/AWAIT ( NO BLOQUEANTE ) */
const sumaAsyncPromiseAsyncAwait = async (retardoIni, num) => {   
    try { 
        let r = await suma.promise(2,1,retardoIni,`suma promise aa ${num}`)
        r = await suma.promise(2,r,1000,`suma promise aa ${num}`)
        r = await suma.promise(2,r,1000,`suma promise aa ${num}`)
        r = await suma.promise(2,r,1000,`suma promise aa ${num}`)
        await suma.promise(2,r,1000,`suma promise aa ${num}`)
    }
    catch(error) {
        console.log(error)
    }
}

sumaAsyncPromiseAsyncAwait(1000,1)
sumaAsyncPromiseAsyncAwait(3000,2)

/* ---------------------------------------------------------------- */
/*                        OTROS PROCESOS                            */
/* ---------------------------------------------------------------- */
function calculos() {
    console.log('Inicio de cálculos...')
    console.log(operaciones.suma(10,3))
    console.log(operaciones.resta(10,3))
    console.log(operaciones.multiplicacion(10,3))
    console.log(operaciones.division(10,3))
    console.log(operaciones.resto(10,3))
    console.log('Fin de cálculos!')
}

calculos()
