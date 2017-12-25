//0smag : chat pour le projet SmagYun https://smag0.blogspot.fr/2017/08/smagyun-une-arduino-yun-preparee-pour.html

///////////////////////////////////////////////////////////
// GESTION NODE EXPRESS SERVEUR
///////////////////////////////////////////////////////////
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var port = process.env.PORT || 3000;

///////////////////////////////////////////////////////////
// GESTION DES COMMANDES LINUX comme reboot
///////////////////////////////////////////////////////////
var exec = require('child_process').exec;

///////////////////////////////////////////////////////////
// GESTION DE LA CARTE ARDUINO
///////////////////////////////////////////////////////////
var linino = require('ideino-linino-lib'),
board = new linino.Board(),
html = new linino.Htmlboard();
var servoH = { pin: board.pin.servo.S9, value : 180 };
var pin13 = board.pin.digital.D13;

///////////////////////////////////////////////
// GESTION CHAT, HISTORIQUE
///////////////////////////////////////////////
var snapshotTemp = {messages:[]}; // un snapshot temporaire incluant les derniers messages
var nbLastMessages = 10; // nombre de messages à afficher pour les nouveaux connectes
var numUsers = 0;

// Routing
app.use(express.static(__dirname + '/public'));

//LANCEMENT SERVEUR
server.listen(port, function () {
	console.log('Server listening at port %d', port);
	console.log('pin13 : LED, pin9: servo');
});


board.connect( function(){
	board.pinMode(servoH.pin, board.MODES.SERVO);
    board.pinMode(pin13, board.MODES.OUTPUT);
	board.servoWrite(servoH.pin, 90);
	io.on('connection', function (socket) {
		console.log("connection");
		var addedUser = false;
		
		// when the client emits 'new message', this listens and executes
		socket.on('new message', function(data){
			newmessage(data, socket);
		});
		
		// when the client emits 'add user', this listens and executes
		socket.on('add user', function (username) {
			//console.log(username);
			if (addedUser) return;
			
			// we store the username in the socket session for this client
			socket.username = username;
			++numUsers;
			addedUser = true;
			socket.emit('login', {
				numUsers: numUsers,
				lastMessages: snapshotTemp.messages
			});
			// echo globally (all clients) that a person has connected
			socket.broadcast.emit('user joined', {
				username: socket.username,
				numUsers: numUsers
			});
		});
		
		// when the client emits 'typing', we broadcast it to others
		socket.on('typing', function () {
			socket.broadcast.emit('typing', {
				username: socket.username
			});
		});
		
		// when the client emits 'stop typing', we broadcast it to others
		socket.on('stop typing', function () {
			//	console.log('stop typing');
			socket.broadcast.emit('stop typing', {
				username: socket.username
			});
		});
		
		// when the user disconnects.. perform this
		socket.on('disconnect', function () {
			console.log('disconnect');
			if (addedUser) {
				--numUsers;
				
				// echo globally that this client has left
				socket.broadcast.emit('user left', {
					username: socket.username,
					numUsers: numUsers
				});
			}
		});
	});
	
	function newmessage(data, socket) {
		// we tell the client to execute 'new message'
		//console.log(data);
		if(data.indexOf('@yun') === 0){
			//console.log("message pour yun de "+socket.username);
			messageToYun(data, socket);
		}
		socket.broadcast.emit('new message', {
			username: socket.username,
			message: data
		});
		// mise à jour des derniers messages
		while (snapshotTemp.messages.length > nbLastMessages){
			var deletedMsg = snapshotTemp.messages.shift();
		}
		snapshotTemp.messages.push({username: socket.username, message: data});		
	}
	
	function messageToYun(data, socket){
		var mess = data;
		var commande = mess.split(" ");
		if (commande[0]=='@yun') {
			console.log(commande[2]);
			switch(commande[1]) {
				case 'servo':
				board.servoWrite(servoH.pin, parseInt(commande[2]));
				break;
				case 'led':
				board.digitalWrite(pin13, parseInt(commande[2]));
				break;
				case 'rgb':
				//console.log(controller);
				//controller.setColor(commande[2]/255, commande[3]/255, commande[4]/255);
				
				/* en cas d'anode ou cathode commune sur led RGB 
					controller.setColor(1-commande[2]/255, 1-commande[3]/255, 1-commande[4]/255);
				*/
				break;
				case 'reboot':
				var rebootCmd = 'echo "reboot"; reboot;';
				exec(rebootCmd, function(error, stdout, stderr) {
					console.log(stdout);
					if(stderr){
						console.log(stderr);
					}
				});	
				break;
				case 'halt':
				var haltCmd = 'echo "halt"; halt;';
				exec(haltCmd, function(error, stdout, stderr) {
					console.log(stdout);
					if(stderr){
						console.log(stderr);
					}
				});	
				break;
				default:
				//code block
			}
		}
		
	}
});					