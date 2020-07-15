function sumar(a,b){
    return a+b;
}
console.log(sumar(10,20))

let sumarFlecha =(a,b)=>a+b;
console.log(sumarFlecha(10,25))

function saludar(){
    return "hola mundo"
}
console.log(saludar())

let saludarFlecha=()=>"hola mundo"
console.log(saludarFlecha())

let saludarUnArgmuento=nombre=>{
    return `Hola ${nombre}`
}
console.log(saludarUnArgmuento("Miguel"))


//las funciones feclhas apuntan el objeto this a lo que esta afuera de ella 
let batman={
    nombre:"bruno",
    apellido:"dias",
    poder:"Murcielago",
    getNombre(){
        return `${this.nombre} ${this.apellido} - poder:${this.poder}`
    }
}
console.log(batman.getNombre())