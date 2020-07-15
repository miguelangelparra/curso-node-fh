//Esto es un callback
setTimeout(function(){
console.log("hola mundo")
},3000)

//Son excelentes para manejo de errores
let getUsuarioById=(id,callback)=>{
 let usuario = {
     nombre: "Miguelangel",
     id
 }

 if (id===20){
     return callback(`el usuario con id ${id} no existe`)
 }
 callback(null,usuario);
}

getUsuarioById(10,(err,usuario)=>{
        if(err){
            return console.log(err)
        }
    console.log("usuario de base de datos",usuario)
})