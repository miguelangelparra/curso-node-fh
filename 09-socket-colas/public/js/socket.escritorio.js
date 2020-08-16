//Comando para establecer la conexion
let socket = io();

//Obtener parametros desde la url (No sirve para ie)
var searchParams = new URLSearchParams(window.location.search);

//Confirma si los parametros tiene un "escritorio"
if (!searchParams.has("escritorio")) {
  window.location = "index.html";
  throw new Error("El escritorio es necesario");
}
//Obtiene el valor de escritorio venido de los parametros de la url
var escritorio = searchParams.get("escritorio");
var label = $("small");
//Setea el texto con el numero de escritorio
$("h1").text("Escritorio " + escritorio);

$("button").on("click", function () {
  socket.emit("atenderTicket", { escritorio: escritorio }, function (resp) {
    console.log(resp);
    if(resp.message==="No hay tickets"){
        label.text(resp.message)
        return;
    }
    label.text('Ticket '+resp.numero)
  });
});
