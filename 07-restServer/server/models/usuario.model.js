const mongoose = require("mongoose");
//Valida que un campo sea unico
const uniqueValidator = require('mongoose-unique-validator')

let rolesValidos={
  values:['ADMIN_ROLE','USER_ROLE'],
  message: '{VALUE} no es un rol valido'
}


let Schema = mongoose.Schema;

let usuarioSchema = new Schema({
  nombre: {
    type: String,
    required: [true, "El nombre es requerido"],
  },
  email: {
    type: String,
    //Indica que el campo debe ser unico
    unique:true,
    required: [true, "El email es requerido"],
  },
  password: {
    type: String,
    required: [true, "La contraseña es obligatoria"],
  },
  img: {
    type: String,
    required: false,
  },
  role: {
    type:String,
    default: "USER_ROLE",
    //Permite declarar valores validos y personalizar el mensaje de error 
    enum:rolesValidos
  },
  estado: {
    type: Boolean,
    default: true,
  },
  google: {
    type: Boolean,
    default: false,
  },
});

//Todo schema tiene metodos, uno de ellos es toJSON el cual utiliza siempre para devolver el objeto. 
//Este metodo se puede alterar a conveniencia para devolver el objeto de una forma particular, por ejemplo:
// para evitar el envio de el campo contraseña
usuarioSchema.methods.toJSON = function (){
  let user =this;
  let userObject=user.toObject();
  delete userObject.password
  return userObject
}

//Le indica al esquema que debe utilizar un plugin, el mensaje es personalizado 
usuarioSchema.plugin(uniqueValidator,{message:'{PATH} debe ser unico.'})

module.exports = mongoose.model("Usuario", usuarioSchema);
