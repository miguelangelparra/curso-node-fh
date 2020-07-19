//Importa la libreria interna http de node
const http = require("http")

//Esto crea el servidor
http.createServer((req,res)=>{

    res.writeHead(200,{"Content-Type": "application/json"})

    let salida = {
        nombre:"miguelangel",
        telefono:"111444-444421",
        url: req.url
    }
    //Escribe la respuesta 
    res.write("Hola mundo \n" )
    res.write(JSON.stringify(salida))
    //Indica que se terminó la respuesta
    res.end();
})
//Indica el puerto que está escuchando
.listen(8080)

console.log(`Escuchando en el puerto 8080`)