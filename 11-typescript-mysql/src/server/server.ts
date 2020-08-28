import express = require("express");
import path = require("path");

export default class Server {
  public app: express.Application;
  public port: number;

  constructor(puerto: number) {
    this.port = puerto;
    this.app = express();
  }
  //Para inicializar en una misma instancia, en el puerto
  static init(puerto: number) {
    return new Server(puerto);
  }

  private publicFolder() {
    const publicPath = path.resolve(__dirname + "../public");
    this.app.use(express.static(publicPath));
  }

  start(callback: Function) {
    this.app.listen(this.port, callback());
  }
}
