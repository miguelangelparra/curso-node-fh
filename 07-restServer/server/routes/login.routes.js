const express = require("express");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(process.env.CLIENT_ID);

const app = express();
const Usuario = require("../models/usuario.model.js");

app.post("/login", (req, res) => {
  let body = req.body;

  //Busca a solo uno en el modelo
  Usuario.findOne({ email: body.email }, (err, usuarioDB) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        err,
      });
    }

    //Si el usuario viene vacio o null
    if (!usuarioDB) {
      return res.status(400).json({
        ok: false,
        err: { message: "Usuario o contraseña incorrectos" },
      });
    }

    //La funcion compareSync del bcrypt compara si dos valores encriptados coinciden.
    if (!bcrypt.compareSync(body.password, usuarioDB.password)) {
      return res.status(400).json({
        ok: false,
        err: { message: "Usuario o contraseña incorrectos" },
      });
    }

    /*El metodo sign del Jwt permite generar un token:
Primer argumento, Tipo objeto, es el payload, toda la informacion a cifrar,
Segundo Argumento, Tipo String, Es el secreto, el seed,
Tercer Argumento, Tipo Objeto, parametros de configuracion como expiresIn para indicar la expiracion*/
    let token = jwt.sign({ usuario: usuarioDB }, process.env.SEED, {
      expiresIn: process.env.CADUCIDAD_TOKEN,
    });

    res.json({
      ok: true,
      usuario: usuarioDB,
      token,
    });
  });
});

//Configuraciones de Google
//Esta funcion verifica el token de Google
async function verify(token) {
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: process.env.CLIENT_ID, // Specify the CLIENT_ID of the app that accesses the backend
    // Or, if multiple clients access the backend:
    //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
  });
  //En el payload viene toda la informarcion del usuario de google
  const payload = ticket.getPayload();
  const userid = payload["sub"];
  // If request specified a G Suite domain:
  // const domain = payload['hd'];

  //HAcemos un retorno de un objeto custom al estilo del modelo que tenemos en nuestra base de datos. De esta manera estamos listos para guardar el usuario en nuestra propia base de datos
  return {
    nombre: payload.name,
    email: payload.email,
    img: payload.picture,
    google: true,
  };
}

app.post("/google", async (req, res) => {
  //Para obtener el token enviado desde el front
  let token = req.body.idtoken;
  //Verifica el Token y retorna un objeto custom para crear el usuario en nuestra base de datos, en caso de fallar, expirar o ser invalido el token se atrapa el error por el catch
  let googleUser = await verify(token).catch((e) => {
    return res.status(403).json({
      ok: false,
      err,
    });
  });

  //Se verifica si el email ya existe en nuestra base de datos
  Usuario.findOne({ email: googleUser.email }, (err, usuarioDB) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        err,
      });
    }
    //Si el usuario existe
    if (usuarioDB) {
      //Se verifica si NO fue creado el usuario con Google Sign in
      if ((usuarioDB.google = false)) {
        return res.status(400).json({
          ok: false,
          err: {
            message: "Debe usar una autenticacion normal",
          },
        });
      } else {
        //Si Fue creado el usuario con Google Sign In se crea el Token
        let token = jwt.sign({ usuario: usuarioDB }, process.env.SEED, {
          expiresIn: process.env.CADUCIDAD_TOKEN,
        });

        return res.json({
          ok: true,
          usuario: usuarioDB,
          token,
        });
      }
    } else {
      //Si el usuario no existe en nuestra base de datos Se debe crear un usuario nuevo
      let usuario = new Usuario();
      usuario.nombre = googleUser.nombre;
      usuario.email = googleUser.email;
      usuario.img = googleUser.img;
      usuario.google = true;
      //Solo para pasar la validacion de la base de datos, no afecta en más nada
      usuario.password = ":)";

      usuario.save((err, usuarioDB) => {
        if (err) {
          return res.status(500).json({
            ok: false,
            err,
          });
        }

        let token = jwt.sign({ usuario: usuarioDB }, process.env.SEED, {
          expiresIn: process.env.CADUCIDAD_TOKEN,
        });

        return res.json({
          ok: true,
          usuario: usuarioDB,
          token,
        });
      });
    }
  });
});
module.exports = app;
