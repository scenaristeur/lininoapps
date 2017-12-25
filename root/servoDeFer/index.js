var express = require('express');
var http = require('http');
var socketio = require('socket.io');
var linino = require('ideino-linino-lib'),
board = new linino.Board();
var servoH = { pin: board.pin.servo.S9, value : 180 };
var pin13 = board.pin.digital.D13;
var angle = 90;
var angleP = 0;
var tickDelay = 100; // 15ms selon source, tempo pour envoi du snapshot par le serveur
var vainqueur = null;

// create the servers
var app = express();
var server = http.Server(app);
var io = socketio(server);

// set port from the environment or fall back
app.set('port', (process.env.PORT || 3001));
// route to static files
app.use(express.static(__dirname + '/public'));
var num_clients = 0;


board.connect( function(){
	board.pinMode(servoH.pin, board.MODES.SERVO);
    board.pinMode(pin13, board.MODES.OUTPUT);
	board.servoWrite(servoH.pin, 90, 500);
});

io.on('connection', function (socket) {
	console.log("connection");
	var addedUser = false;
	
	// when the client emits 'new message', this listens and executes
	socket.on('servoMove', function(data){
		if (angle <= 0){
			vainqueur = "d";
			}
			else if (angle >= 180){
			vainqueur = "g";
		}
		if (vainqueur == null){
			angle = angle + data;
			}
		else{	
			io.sockets.emit("vainqueur", vainqueur);
		}
	});
	
	socket.on('start', function(data){
		angle = 90;
		vainqueur = null;
		board.servoWrite(servoH.pin, angle, 500);
		io.sockets.emit("start", angle);
	});
});


// listen
server.listen(app.get('port'), function () {
	var host = server.address().address;
	var port = server.address().port;
	console.log('listening at http://%s:%s', host, port);
});


tickInterval = setInterval(function(){
	if( angle != angleP ){
		board.servoWrite(servoH.pin, angle, 10);
		angleP = angle;
		io.sockets.emit("angle", angle); 
	}
}, tickDelay);