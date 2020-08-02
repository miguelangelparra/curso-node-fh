//************ */
//Puerto
//************ */
process.env.PORT = process.env.PORT || 3000;

//************* */
//ENTORNO
//************* */
process.env.NODE_ENV = process.env.NODE_ENV || "dev";

//*************** */
//CADUCIDAD TOKEN
//*************** */
// 60 segundos
// 60 minutos
// 24 horas
// 30 dias
process.env.CADUCIDAD_TOKEN = 60 * 60 * 24 * 30;

//************ */
// SEED TOKEN
//************ */
process.env.SEED = process.env.SEED || "Este-Es-Mi-Secreto-Seed";

//******************* */
// Base de Datos URLDB
//******************* */
let urlDB;
if (process.env.NODE_ENV === "dev") {
  urlDB = "mongodb://localhost:27017/cafe";
} else {
  urlDB = process.env.MONGODB_URI;
}
process.env.URLDB = urlDB;

//******************* */
// Google client ID
//******************* */
process.env.CLIENT_ID = process.env.CLIENT_ID || "79844113959-ph465npo5gok8sm2763r9pm91iksj32a.apps.googleusercontent.com"