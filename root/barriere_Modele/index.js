var express = require('express');
var http = require('http');
var socketio = require('socket.io');
var linino = require('ideino-linino-lib'),
board = new linino.Board();
var servoH = { pin: board.pin.servo.S9, value : 180 };
var pin13 = board.pin.digital.D13;

// create the servers
var app = express();
var server = http.Server(app);
var io = socketio(server);

// set port from the environment or fall back
app.set('port', (process.env.PORT || 3003));
// route to static files
app.use(express.static(__dirname + '/public'));

var num_clients = 0;


board.connect( function(){
	board.pinMode(servoH.pin, board.MODES.SERVO);
    board.pinMode(pin13, board.MODES.OUTPUT);
	
});

io.on('connection', function (socket) {
	console.log("connection");
	var addedUser = false;
	
	// when the client emits 'new message', this listens and executes
	socket.on('ouvre', function(data){
		//newmessage(data, socket);
        console.log('ouvre');
		board.servoWriteNoVib(servoH.pin, 90);
	});
	
	socket.on('ferme', function(data){
		//newmessage(data, socket);
		console.log('ferme');
		board.servoWriteNoVib(servoH.pin, 0);
	});
});


// listen
server.listen(app.get('port'), function () {
	var host = server.address().address;
	var port = server.address().port;
	
	console.log('listening at http://%s:%s', host, port);
});
