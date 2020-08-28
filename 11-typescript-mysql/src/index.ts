import Server from './server/server';
import router from './router/router';
import MySQL from './mysql/mysql';

const server=Server.init(3000);

server.app.use(router)

//Obtiene la instancia de la conexion a la base de datos
// MySQL.instance


server.start(()=>{
    console.log("Escuchando en el puerto 3000" )

})