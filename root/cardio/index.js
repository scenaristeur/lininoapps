//https://github.com/ideino/ideino-linino-lib
//https://github.com/ideino/ideino-linino-lib#advanced-configuration

///////////////////////////////////////////////////////////
// GESTION NODE EXPRESS SERVEUR
///////////////////////////////////////////////////////////
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var port = process.env.PORT || 3006;

///////////////////////////////////////////////////////////
// GESTION DES COMMANDES LINUX comme reboot
///////////////////////////////////////////////////////////
//var exec = require('child_process').exec;
var seuil = 0;

///////////////////////////////////////////////////////////
// GESTION DE LA CARTE ARDUINO
///////////////////////////////////////////////////////////
var linino = require('ideino-linino-lib'),
board = new linino.Board();//,
//html = new linino.Htmlboard();
//var servoH = { pin: board.pin.servo.S9, value : 180 };
//var pin13 = board.pin.digital.D13;
var sensor = board.pin.analog.A0;
var potar = board.pin.analog.A1;

// Routing
app.use(express.static(__dirname + '/public'));

//LANCEMENT SERVEUR
server.listen(port, function () {
	console.log('Server listening at port %d', port);
	console.log('capteur cardiaque : A0');
	console.log('potentiometre : A1');
	
});





board.connect(function(){
	var options = {resolution: 0.1, sampling: 1};
	var optionsPot = {resolution: 1, sampling: 100};
	console.log('CARTE Connected');
	
	board.analogRead(potar, optionsPot, function(s){
		console.log(s);
		if (s != seuil){
			seuil = s;
			//socket.emit('seuil', seuil);
		}
	});
	
	io.on('connection', function (socket) {
		console.log("CLIENT connected");
		
		
		//setInterval(function() {
		
		
		
		board.analogRead(sensor, options, function(rawValue){
			var now = Date.now();
			var data = {};
			data.t = now;
			data.val = rawValue;
			data.seuil = seuil;
			
			socket.emit('mesure', data);
		});
		
	});
	
});	




