const express = require('express');
const bodyParser = require('body-parser')

const app = express();

app.use(express.static(__dirname + '/views'));
app.use(bodyParser.urlencoded({extended: true}));


function getResponsePage(nombre) {

    return  '<body style="background-color:blue;">' +
                '<h1 style="color:white;">Hola '+nombre+'</h1>'+
                '<h2 style="color:white;">'+new Date()+'</h2>'+
            '</body>';
}

function getResponsePageTS(nombre) {

    return `
        <body style="background-color:green;">
            <h1 style="color:white;">Hola ${nombre}</h1>
            <h2 style="color:white;">${new Date()}</h2>
        </body>
    `;
}

app.post('/datos', function (req, res) {
	console.log(req.body);
	let nombre = req.body.nombre;
    res.send(getResponsePageTS(nombre));
});

const PORT = 8080
app.listen(PORT, function(err) {
	if(err) return console.log(err);
	console.log('Servidor Listen Port '+PORT);
});
