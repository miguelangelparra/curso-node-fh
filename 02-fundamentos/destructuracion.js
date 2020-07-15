let batman={
    nombre:"bruno",
    apellido:"dias",
    poder:"Murcielago",
    getNombre: function () {
        return `${this.nombre} ${this.apellido} - poder:${this.poder}`
    }
}
console.log(batman.getNombre())

//los : le cambia el nombre de la variable en la destructuracion 
let {nombre:primernombre,apellido,poder} = batman 

console.log(primernombre,apellido,poder)