///////////////////////////////////////////////////////////
// GESTION NODE EXPRESS SERVEUR
///////////////////////////////////////////////////////////
var debug_server = false;

var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var port = process.env.PORT || 3008;
var users = [];


// Routing
app.use(express.static(__dirname + '/public'));

//LANCEMENT SERVEUR
server.listen(port, function () {
	console.log('Server listening at port %d', port);
	
});



var numUsers = 0;

io.on('connection', function (socket) {
	var addedUser = false;
	
	log("connected");
	// when the client emits 'new message', this listens and executes
	socket.on('new message', function (data) {
		// we tell the client to execute 'new message'
		socket.broadcast.emit('new message', {
			username: socket.username,
			message: data
		});
	});
	
	// when the client emits 'add user', this listens and executes
	socket.on('add user', function (user) {
		log(user);
		
		///////////////////////////////////////////////////
		
		socket.username = user.username;
		socket.color = user.color;
		/*
			if (users.indexOf(username) === -1 ){
			//users.push(user);
			users.push(username);
			socket.username = username;
			++numUsers;
			socket.emit("user cree", username);
			}else{
			//creer un index ? demander un nouveau nom ?
			socket.emit("user exist", username);
			console.log("This item already exists");
		}*/
		/////////////////////////////////////////////////////////////
		
		log(users);
		/* if (addedUser) return;
			
			// we store the username in the socket session for this client
			socket.username = username;
			++numUsers;
			addedUser = true;
			socket.emit('login', {
			numUsers: numUsers
			});
			// echo globally (all clients) that a person has connected
			socket.broadcast.emit('user joined', {
			username: socket.username,
			numUsers: numUsers
		});*/
	});
	
	
	
	
	// when the client emits 'typing', we broadcast it to others
	socket.on('update', function (data) {
		log(data);
		socket.broadcast.emit('update', {
			username: socket.username,
			color: socket.color,
			position: data
		}
		);
	});
	
	// when the client emits 'stop typing', we broadcast it to others
	socket.on('level', function (data) {
		log("level");
		log(data);
		socket.broadcast.emit('update', {
			username: socket.username,
			level: data
		});
	});
	
	socket.on('finish', function (data) {
		log("finish");
		log(data);
		socket.broadcast.emit('update', {
			username: socket.username,
			finish: data
		});
	});
	
	// when the user disconnects.. perform this
	socket.on('disconnect', function () {
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

function log(data){
	if(debug_server){
		console.log(data);
	}
}