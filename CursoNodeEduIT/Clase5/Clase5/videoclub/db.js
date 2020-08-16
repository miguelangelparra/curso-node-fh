const mongoose = require('mongoose');
const model = require('./model');


function conectarDB(url, cb) {
    mongoose.connect(url, { useNewUrlParser: true }, function(err) {
		if(cb != null) cb(err);
	});
}

function guardarPelicula(data, cb) {
	var pelicula = new model.peliculas(data);
	pelicula.save( function(err, doc){
		if(!err) {
		  	console.log('Pelicula Insertada en DB');
		  	if(cb != null) cb();
		}
		else console.log('error en WR DB');
	});
}

function listarPeliculas(filtro,cb) {
	model.peliculas.find(filtro, function(err, pelis) {
		if (!err) {
			//ordeno registros
			pelis.sort(function(a, b) {
				return a['_id'] > b['_id'] ? 1 : -1;
			});
			
			var data = new Array;
			//represento mensajes
			pelis.forEach(function (peli, indice, pels) {
				data.push(peli);
				console.log(peli);
			});
		  	console.log('Peliculas Leidas desde DB');
			cb(data);
		}
		else console.log('error en RD DB');
	});
}

const URL_BASE_DE_DATOS = 'mongodb://localhost:27017/dbvideoclub'; //BASE LOCAL
//const URL_BASE_DE_DATOS = 'mongodb+srv://daniel:daniel123@misdatos-fs00f.mongodb.net/dbvideoclub?retryWrites=true&w=majority'

module.exports = {
	URL_BASE_DE_DATOS,
	conectarDB,
	guardarPelicula,
	listarPeliculas
}

