import mysql = require("mysql");

export default class MySQL {
  //Patron Singleton
  private static _instance: MySQL;

  connection: mysql.Connection;
  conectado: boolean = false;

  constructor() {
    console.log("Clase de mysql incializada");
    this.connection = mysql.createConnection({
      host: "localhost",
      user: "node_user",
      password: "123456",
      database: "nodedb",
    });

    this.conectarDB();
  }

  //Patron Singleton
  // Verifica si la instancia existe, si no la crea
  public static get instance() {
    return this._instance || (this._instance = new this());
  }

  //MEtodo que permite hacer query
  static ejecutarQuery(query: string, callback: Function) {
    // el metodo connection pertenece a esta clase, como no sabemos si esta inicializada o no se debe hacer referencia al metodo que obtiene la instancia, en que de que exista la usa y en caso de que no la crea.
    this.instance.connection.query(query, (err, results: Object[], fields) => {
      if (err) {
        console.log("Error en Query", err);
        return callback(err);
      }

      //En caso de que no se encuentre nada
      if (results.length === 0) {
        callback("El registro solicitado no existe");
      } else {
        callback(null, results);
      }
    });
  }

  //Metodo que realiza la conexion a la base de datos
  private conectarDB() {
    this.connection.connect((err: mysql.MysqlError) => {
      if (err) {
        console.log(err.message);
        return;
      }
      this.conectado = true;
      console.log("Base de datos online ");
    });
  }
}
