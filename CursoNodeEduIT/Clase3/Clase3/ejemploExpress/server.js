const express = require('express')

const app = express()

//console.log(__dirname)
app.use(express.json())
app.use(express.urlencoded({extended:true}))

/* Servicio de archivos estáticos de express */
app.use(express.static('public'))

/* Capa para mostrar info */
app.use((req,res,next) => {
    console.log('**********************************************')
    console.log('URL:', req.url)
    console.log('METHOD:', req.method)
    console.log('QUERY:', req.query)
    console.log('BODY:', req.body)
    console.log('**********************************************')
    console.log('')
    next()
})

/* Capa para generar un retardo */
app.use((req,res,next) => {
    if(req.url == '/visitas') {
        console.log('Ini retardo')
        /* for(let i=0; i<5e9; i++);
        next() */
        setTimeout(() => {
            next()
        },3000)
    }
    else {
        next()
    }
})

/* Capa para loguear timestamp */
app.use((req,res,next) => {
    console.log('Timestamp', Date.now())
    next()
})

/* Capa para loguear fecha y hora */
app.use((req,res,next) => {
    console.log('FyH', new Date().toLocaleString())
    next()
})

/* Capa para verificar versión */
app.use((req,res,next) => {
    if(req.query.version == 'aa12') res.send('<h1 style="color:red;">Error de version</h1>')
    else next()
})


let contadorVisitas = 0

/* ------------------------------------------------------ */
/*                     RUTAS GET                          */
/* ------------------------------------------------------ */
/* app.get('/', (req,res) => {
    res.sendFile(__dirname+'/public/index.html')
}) */

app.get('/visitas', (req,res) => {
    contadorVisitas++    
    res.send('<i>Hola express!</i> - Visitas: <b>' + contadorVisitas + '</b>')
})

app.get('/datos/:apellido/:curso?', (req,res) => {
    let query = req.query //query params
    //console.log(query) 
    let params = req.params //params
    //console.log(params)
    let {url, method} = req

    let info = `
                <h2>
                    Ok GET <br>
                    url: ${url}<br>
                    method: ${method}<br>
                    query: <pre>${JSON.stringify(query,null,4)}</pre><br>
                    params: <pre>${JSON.stringify(params,null,4)}</pre><br>
                </h2>
            `
    res.send(info)
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
    //console.log(body)

    let {url, method} = req
    res.send(`
        <h2> 
            Ok POST <br>
            url: ${url}<br>
            method: ${method}<br>
            body: <pre>${JSON.stringify(body,null,4)}</pre>
        </h2>
    `)
})

app.post('/datos', (req,res) => {
    let body = req.body
    //console.log('Datos del form', body)

    res.redirect('/')
})


/* ------------------------------------------------------ */
/*                     RUTAS PUT                          */
/* ------------------------------------------------------ */
app.put('/:id', (req,res) => {
    let body = req.body
    let params = req.params
    let {url, method} = req

    res.send(`
        <h2> 
            Ok PUT <br>
            url: ${url}<br>
            method: ${method}<br>
            params: <pre>${JSON.stringify(params,null,4)}</pre>
            body: <pre>${JSON.stringify(body,null,4)}</pre>
        </h2>
    `)
})

/* ------------------------------------------------------ */
/*                     RUTAS DELETE                       */
/* ------------------------------------------------------ */
app.delete('/:id', (req,res) => {
    let params = req.params
    let {url, method} = req

    res.send(`
        <h2> 
            Ok DELETE <br>
            url: ${url}<br>
            method: ${method}<br>
            params: <pre>${JSON.stringify(params,null,4)}</pre>
        </h2>
    `)
})


/* Server listen */
const PORT = 8080

const server = app.listen(PORT, err => {
    if(err) return console.log(`Error en servidor express: ${err}`)
    console.log(`Servidor express escuchando en el puerto ${server.address().port}`)
})

/* --------------------------- */
/* Otra instancia de servidor  */
/* --------------------------- */
const app1 = express()

app1.get('/', (req,res) => {
    res.json({mensaje: 'Soy el servidor 2'})
})

const server1 = app1.listen(PORT+1, err => {
    if(err) return console.log(`Error en servidor express: ${err}`)
    console.log(`Servidor express escuchando en el puerto ${server1.address().port}`)
})



