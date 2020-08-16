//require de librerias npm
const express = require('express');
const bodyParser = require('body-parser');
const exphbs  = require('express-handlebars');
const db = require('./db');
const routes = require('./routes');

//seteo port servidor express
const port = process.env.app_port || 8080;

//llamo a express
const app = express();

// -----------------------
// CONFIGURACION DE EXPRESS
// -----------------------
app.engine('.hbs', exphbs({extname: '.hbs'}));
//midlewares
app.use(express.static(__dirname + '/views'));
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', '.hbs');
app.use(function(req, res, next) {
    //console.log('query:', req.query);
    //console.log('body:', req.body);
    next()
});

// -----------------------
// RUTEO
// -----------------------
app.get('/', routes.getRoot);
app.post('/guardar', routes.postGuardar);
app.get('/listar', routes.getListar);
app.get('*', function(req, res){
    res.status(404).render('404_error_template', {title: "Página no encontrada"});
});


// -----------------------------------------
// CONEXIÓN BASE DE DATOS Y LISTEN SERVIDOR
// -----------------------------------------
db.conectarDB(db.URL_BASE_DE_DATOS, function(err) {
	if(err) return console.log('Error en conexión de base de datos: ' + err);
	console.log('Base de Datos Conectada');

    app.listen(port, function(err) {
        if(err) return console.log('error en listen server:' + err);
        console.log('Server running on port ' + port);
    });
});
