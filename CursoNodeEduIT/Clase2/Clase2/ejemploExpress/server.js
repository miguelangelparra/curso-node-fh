const express = require('express')

const app = express()

//console.log(__dirname)

app.use(express.json())


let contadorVisitas = 0

/* ------------------------------------------------------ */
/*                     RUTAS GET                          */
/* ------------------------------------------------------ */
app.get('/', (req,res) => {
    contadorVisitas++    
    res.send('<i>Hola express!</i> - Visitas: <b>' + contadorVisitas + '</b>')
})

app.get('/page', (req,res) => {
    res.sendFile(__dirname+'/public/index.html')
})

app.get('/datos/:apellido/:curso?', (req,res) => {
    let query = req.query //query params
    console.log(query) 

    let params = req.params //params
    console.log(params)

    let {url, method} = req
    let info = `<h2>Ok get - url: ${url} - method: ${method}</h2>`
    res.send({nombre: 'Juan', edad: 23, info, query, params })
})

app.get('*', (req,res) => {
    let {url, method} = req
    res.send(`<b style="color:red;">Ruta ${url} para método ${method} No implementada`)
})

/* ------------------------------------------------------ */
/*                     RUTAS POST                         */
/* ------------------------------------------------------ */
app.post('/', (req,res) => {
    let body = req.body
    console.log(body)

    let {url, method} = req
    res.send(`<h2> Ok post - url: ${url} - method: ${method}</h2> ${JSON.stringify(body)}`)
})

/* ------------------------------------------------------ */
/*                     RUTAS PUT                          */
/* ------------------------------------------------------ */
app.put('/', (req,res) => {
    let {url, method} = req
    res.send(`<h2>Ok put - url: ${url} - method: ${method}</h2>`)
})


/* ------------------------------------------------------ */
/*                     RUTAS DELETE                       */
/* ------------------------------------------------------ */
app.delete('/', (req,res) => {
    let {url, method} = req
    res.send(`<h2>Ok delete - url: ${url} - method: ${method}</h2>`)
})


/* Server listen */
const PORT = 8080

const server = app.listen(PORT, err => {
    if(err) return console.log(`Error en servidor express: ${err}`)
    console.log(`Servidor express escuchando en el puerto ${server.address().port}`)
})
