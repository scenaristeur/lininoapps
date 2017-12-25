
	var socket = io();
console.log(socket);




function ouvreBarriere(){
  console.log("ouvre");
  socket.emit('ouvre');
}

function fermeBarriere(){
  console.log("ferme");
  socket.emit('ferme');
}
