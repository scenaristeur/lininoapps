//https://github.com/ideino/ideino-linino-lib

///////////////////////////////////////////////////////////
// GESTION NODE EXPRESS SERVEUR
///////////////////////////////////////////////////////////
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var port = process.env.PORT || 3005;

///////////////////////////////////////////////////////////
// GESTION DES COMMANDES LINUX comme reboot
///////////////////////////////////////////////////////////
//var exec = require('child_process').exec;

///////////////////////////////////////////////////////////
// GESTION DE LA CARTE ARDUINO
///////////////////////////////////////////////////////////
var linino = require('ideino-linino-lib'),
board = new linino.Board(),
html = new linino.Htmlboard();
//var servoH = { pin: board.pin.servo.S9, value : 180 };
//var pin13 = board.pin.digital.D13;
var pot = board.pin.analog.A0;

// Routing
app.use(express.static(__dirname + '/public'));

//LANCEMENT SERVEUR
server.listen(port, function () {
	console.log('Server listening at port %d', port);
	console.log('potentiometre : A0');
	
});




board.connect(function(){
	console.log('CARTE Connected');
	io.on('connection', function (socket) {
		console.log("CLIENT connected");
		
		
		board.analogRead(pot, function(value){
			console.log('value: ' + value);
		//	var data = {"AO": value};
			socket.emit('update', value);
		});
	});
	
});	