const fs = require('fs')

/* ----------------------------------------- */
/* READ / WRITE FILE SYSTEM FORMA SINCRÓNICA */
/* ----------------------------------------- */
/*
console.log('inicio del programa')

try {
    let datos = fs.readFileSync('../datos.txt','utf-8')
    console.log('RD1 ok', datos, datos.length)

    fs.writeFileSync('../datos.txt', new Date().toLocaleString())
    console.log('WR ok')

    datos = fs.readFileSync('../datos.txt','utf-8')
    console.log('RD2 ok', datos, datos.length)
}
catch(error) {
    console.log(`Error en lectura de archivo: ${error}`)
}

console.log('fin del programa')

*/

/* ------------------------------------------ */
/* READ / WRITE FILE SYSTEM FORMA ASINCRÓNICA */
/* ------------------------------------------ */
console.log('inicio del programa')

fs.readFile('../datos.txt','utf-8', (error, datos) => {
    if(error) return console.log(`Error en lectura de archivo: ${error}`)
    console.log('RD1 ok', datos, datos.length)

    fs.writeFile('../datos.txt', new Date().toLocaleString(), error => {
        if(error) return console.log(`Error en escritura de archivo: ${error}`)
        console.log('WR ok')

        fs.readFile('../datos.txt','utf-8', (error, datos) => {
            if(error) return console.log(`Error en lectura de archivo: ${error}`)
            console.log('RD2 ok', datos, datos.length)
        })
    })
})

console.log('fin del programa')
