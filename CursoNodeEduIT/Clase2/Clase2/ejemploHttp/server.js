const http = require('http')
const fs = require('fs')

const PORT = 8080

let contadorVisitas = 0
const server = http.createServer((req,res) => {
    //let url = req.url
    //let method = req.method
    /*
    let { url,method } = req
    console.log(url, method)
    */
    let { url:ruta,method:metodo } = req
    console.log(ruta, metodo)

    if(metodo == 'GET') {
        if(ruta == '/') {
            res.end('Visitas: ' + (++contadorVisitas))
        }
        else if(ruta == '/page') {
            let pathIndex = 'public/index.html'

            /* LECTURA ASINCRÓNICA -> SI!!!!! (NO BLOQUEANTE) */
            fs.readFile(pathIndex, 'utf-8', (error, page) => {
                /* Error de recurso */
                if(error) {
                    console.log(`Error en lectura ${error}`)
                    res.writeHead(404, {'content-type':'text/html'})
                    res.end(`<b>Recurso ${pathIndex} no encontrado</b>`)
                }
                else {
                    res.writeHead(200, {'content-type':'text/html'})
                    res.end(page)
                }
            })

            /* LECTURA SINCRÓNICA -> NO!!!!! (BLOQUEANTE) */
            /* try {
                let page = fs.readFileSync(pathIndex,'utf-8')
                for(let i=0; i<5e9; i++);
                res.writeHead(200, {'content-type':'text/html'})
                res.end(page)
            }
            // Error de recurso
            catch(error) {
                console.log(`Error en lectura ${error}`)
                res.writeHead(404, {'content-type':'text/html'})
                res.end(`<b>Recurso ${pathIndex} no encontrado</b>`)
            }*/
        }
        /* Error de ruta */
        else {
            res.writeHead(500, {'content-type':'text/html'})
            res.end(`<b>Ruta ${ruta} no implementada</b>`)
        }
    }
    /* Error método */
    else {
        res.writeHead(500, {'content-type':'text/html'})
        res.end(`<b>Método ${metodo} no implementado</b>`)
    }
})

server.listen(PORT, err => {
    if(err) return console.log(`Error en servidor http: ${err}`)
    console.log(`Servidor http escuchando en el puerto ${PORT}`)
})
