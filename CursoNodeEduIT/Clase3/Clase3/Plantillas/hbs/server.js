const express = require('express');
const exphbs  = require('express-handlebars');

const app = express();

app.engine('.hbs', exphbs({extname: '.hbs', defaultLayout:'main.hbs'}));
app.set('view engine', '.hbs');


app.get('/', function (req, res) {
    res.render('home', {
    	nombre:'Juan',
		helpers : {
			saludo : function(){
				return "Hola!"
			},
			getFecha : function(){
				return Date();
			}
		}
	});
});

app.get('/login', function (req, res) {
    res.render('login', {
    	nombre:'Daniel',
    	apellido:'Sanchez',
    	mail: 'danielsanchez68@hotmail.com'
    });
});

app.get('/about', function (req, res) {
    res.render('about', {nombre:'Daniel'});
});

app.get('*', function(req, res){
    res.status(404).render('404_error_template', {title: "Página no encontrada"});
});

const PORT = 8080
app.listen(PORT, function(err){
	if(err) return console.log(err);
	console.log('Servidor Listen Port '+ PORT);
});
