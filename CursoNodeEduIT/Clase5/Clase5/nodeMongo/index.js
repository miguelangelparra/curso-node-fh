//https://www.npmjs.com/package/mongoose

const mongoose = require('mongoose')
const Schema = mongoose.Schema

/* ------------------------------------------------------------------- */
/*  Definición del esquema y el modelo para interactuar con los datos  */
/* ------------------------------------------------------------------- */
const usuarioSchema = new Schema({
    nombre: String,
    edad: Number
})
const usuarioModel = mongoose.model('usuarios', usuarioSchema)

/* --------------------------------------------------------- */
/*           Conexión a la base de datos: MIBASE             */
/* --------------------------------------------------------- */
//mongoose.connect('mongodb://localhost/mibase',{ //conexión local
mongoose.connect('mongodb+srv://daniel:daniel123@misdatos-fs00f.mongodb.net/mibase?retryWrites=true&w=majority',{ //conexión remota (atlas)
    useNewUrlParser: true,
    useUnifiedTopology: true
}, err => {
    if(err) return console.log('Error en conexión de base de datos')
    console.log('Base de datos conectada!')

    /* ----------------------------------------------------------- */
    /* Escritura de la base de datos: MIBASE, collection: USUARIOS */
    /* ----------------------------------------------------------- */
    const usuarioNuevo = new usuarioModel({
        nombre: 'Pablo',
        edad: 27
    })

    /* usuarioNuevo.save( err => {
        if(err) return console.log(`error en escritura: ${err}`)
        console.log('Escritura ok!')
 */
        /* --------------------------------------------------------- */
        /* Lectura de la base de datos: MIBASE, collection: USUARIOS */
        /* --------------------------------------------------------- */
        //usuarioModel.find({edad: {$gte:28,$lt:31}}, (err, usuarios) => {
        usuarioModel.find({}, (err, usuarios) => {

            if(err) return console.log(`error en lectura: ${err}`)
            usuarios.forEach(usuario => {
                console.log(usuario)
            })
        }).sort({edad:1,nombre:1})//.limit(3)
    //})
})
