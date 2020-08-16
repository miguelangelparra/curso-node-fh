'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var mensaje = 'Hola!';

var nombre = 'Lucas';
var mensaje2 = 'Hola ' + nombre;

console.log(mensaje);
console.log(mensaje2);

var sumar = function sumar(a, b) {
    return a + b;
};
console.log('La suma es ' + sumar(5, 9));

var Persona = function () {
    function Persona(nombre, edad) {
        _classCallCheck(this, Persona);

        this.nombre = nombre;
        this.edad = edad;
    }

    _createClass(Persona, [{
        key: 'getNombre',
        value: function getNombre() {
            return this.nombre;
        }
    }, {
        key: 'getEdad',
        value: function getEdad() {
            return this.edad;
        }
    }]);

    return Persona;
}();

var juan = new Persona('Juan', 24);
var ana = new Persona('Ana', 23);

console.log(juan.getNombre());
console.log(juan.getEdad());

console.log(ana.getNombre());
console.log(ana.getEdad());
