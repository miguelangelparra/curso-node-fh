const express = require('express');
const pug = require('pug');

const app = express();


app.set('view engine', 'pug');
app.set('views', './views');


app.get('/', function (req, res) {
  res.render('home', { 
      title: 'Página Pug', 
      message: 'Hola Juan',
      personas: [
        'Pedro',
        'María',
        'Pepe',
        'Ana'
      ]
    }
  );
});

const PORT = 8080
app.listen(PORT, function(){
	console.log('Server up in port ' + PORT);
});
