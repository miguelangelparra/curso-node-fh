const sync = (a,b,retardo,mensaje) => {
    let res = a + b
    console.log(mensaje,res)
    for(let i=0; i<retardo; i++);

    return res
}

const cb = (a,b,retardo, mensaje, cb) => {
    let res = a + b
    console.log(mensaje,res)

    setTimeout(cb, retardo, res);
}

const promise = (a,b,retardo,mensaje) => new Promise((resolve, reject) => {
    let typeA = typeof a
    let typeB = typeof b

    if(typeA == 'number' && typeB == 'number') {
        let res = a + b
        console.log(mensaje,res)
    
        setTimeout(resolve, retardo, res);
    }
    else {
        let error = {
            mensaje: 'Error de tipo',
            a,
            typeA,
            b,
            typeB
        }
        reject(error)
    }
})

module.exports = {
    sync,
    cb,
    promise
}