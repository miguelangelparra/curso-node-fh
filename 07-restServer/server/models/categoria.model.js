const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const usuarioModel = require("./usuario.model");

let Schema = mongoose.Schema;

let categoriaSchema = new Schema({
  nombre: {
    type: String,
    unique: true,
    required: [true, "Se require un nombre de categoria"],
  },
  descripcion: {
    type: String,
    required: [true, "Es necesaria una descripcion"],
  },
  usuario: {
    type: mongoose.Schema.Types.ObjectId,
    //Se debe hacer referencia a la collecion a la que corresponde el id 
    ref:'Usuario',
    required: [true, "Se requiere un id del creador"],
  },
  estado: {
    type: Boolean,
    default: true,
  },
});

categoriaSchema.plugin(uniqueValidator, { message: "{PATH} debe ser unico" });

module.exports = mongoose.model("Categoria", categoriaSchema);
