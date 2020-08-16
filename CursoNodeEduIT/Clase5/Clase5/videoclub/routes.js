const db = require('./db');

function getRoot(req, res) {
  //console.log(req.query);
  //res.sendFile(__dirname + '/views/index.html');
};


function getListar(req, res) {
  console.log(req.query);
  let filtro = req.query;
  db.listarPeliculas(filtro, function(lista) {
    console.log('------------')
    console.log(lista)
    res.render('home', { lista : lista });
    //res.send(lista);
  });
}


function postGuardar(req, res) {
/*   let titulo = req.body.titulo;
  let genero = req.body.genero;
  let year = req.body.year;
 */  
  //let { titulo, genero, year } = req.body
  //console.log(req.body);
  //db.guardarPelicula({titulo, genero, year}, function() {
  db.guardarPelicula(req.body, function() {
    //res.sendFile(__dirname + '/views/index.html');
    res.redirect('/');
  });
}

module.exports = {
  getRoot,
  getListar,
  postGuardar
};
