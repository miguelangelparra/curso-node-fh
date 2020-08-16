const mongoose = require('mongoose');

var nombreCollection = 'peliculas';

// -------------------------------------------------------------
//                         SCHEMA
// -------------------------------------------------------------
var peliculaSchema = mongoose.Schema({
    titulo: String,
    genero: String,
    year: Number
});

var peliculas = mongoose.model(nombreCollection, peliculaSchema);

module.exports = {
	peliculas
}
