//*************** */
// Verificar TOken
//*************** */
const jwt = require("jsonwebtoken");

//Esto es un middleware para verificar el token
let verificaToken = (req, res, next) => {
  //req.get("String") obtiene los headers
  let token = req.get("token"); //Authorization

  //La funcion verify de JWT permite verificar el token enviado con
  //Primerar parametro: eltoken
  //Segundo PArametro: La semilla para verificar y desencriptar el token
  // una callback con primer parametro de error y seundo parametro el payload proveniente de la verificacion del token
  jwt.verify(token, process.env.SEED, (err, decoded) => {
    if (err) {
      res.status(401).json({
        ok: false,
        err: {
          message: "Token invalido",
        },
      });
    }
    //Decoded es el payload desencriptado. Se puede agregar al req para que la informacion del usuario esté disponible en la peticion
    req.usuario = decoded.usuario;
    next();
  });
};

//*************** */
// Verificar ADmin Role
//*************** */

let verificaAdmin_Role = (req, res, next) => {
  let usuario = req.usuario;
  if (usuario.role === "ADMIN_ROLE") {
    next();
  } else {
    return res.status(403).json({
      ok: false,
      err: {
        message: "No es administrador",
      },
    });
  }
};


//*************** */
// Verificar Token para Img
//*************** */
//Para proteger las imagenes en directorios NO-publicos Se requiere la verificacion del token del usuario
//Como son imagenes se tendrian problemas al momento de la visualizacion cuando el <img src"X"> intente buscar la ruta de la imagen
//Por eso es necesario hacer un metodo aparte que tome el token desde la url por query string
let verificaTokenImg = (req, res, next) => {

  let token =req.query.token

  jwt.verify(token, process.env.SEED, (err, decoded) => {
    if (err) {
      res.status(401).json({
        ok: false,
        err: {
          message: "Token invalido",
        },
      });
    }
    //Decoded es el payload desencriptado. Se puede agregar al req para que la informacion del usuario esté disponible en la peticion
    req.usuario = decoded.usuario;
    next();
  });
}
module.exports = { verificaToken, verificaAdmin_Role,verificaTokenImg };
