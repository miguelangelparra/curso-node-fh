var socket;

document.addEventListener("DOMContentLoaded", function() {
	socket  = io.connect();

	socket.on('messages', function(data){
		console.log(data);
		render(data);
	});

	function render(data){
		var html = data.map(function(elem, index) {
			return(	`<div>
						<strong>${elem.autor}</strong>
						<em>${elem.text}</em>
					</div>`);
		}).join(" ");

		document.getElementById('messages').innerHTML = html;
	}
});

function addMessage(e){
	var payload = {
		autor : document.getElementById("username").value,
		text : document.getElementById("texto").value
	};

	socket.emit('new-message',payload);
	document.getElementById("texto").value = "";
	document.getElementById("texto").focus();

	return false;
}
