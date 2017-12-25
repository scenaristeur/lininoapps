// Setup basic express server
var express = require('express');


var when = require('when');
var nodefn = require('when/node');
var whenKeys = require('when/keys');
var fs = require('fs');
var exec = require('child_process').exec;
var LinuxPWMController = require('./lib/LinuxPWMController').LinuxPWMController;

var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var port = process.env.PORT || 3001;


var pinExport = {D3:0, D5:4, D6:5, D9:1,  D10:2, D11:3};

function write(path, data){
	return nodefn.call(fs.writeFile, path, data, { encoding: 'ascii' });
}

function read(path){
	nodefn.call(fs.readFile, path).then(function(reponse){
		return Number(reponse) ;
	});
}



// EXPORT DES PWM
//?? 123 ? 
//5 --> D6
//3 --> D11
//2 --> D10
//4 --> D5
//0 --> D3


/*Linino GPIO	Yun Pin
	104		D8
	105		D9
	106		D10
	107		D11
	114		D5
	115		D13
	116		D3
	117		D2
	120		D4
	122		D12
123		D6 */



//EXPORT PINS & VARIABLES JEU SPEEDCLIC
write("/sys/class/pwm/pwmchip0/export", pinExport.D5);
write("/sys/class/pwm/pwmchip0/export", pinExport.D10);
write("/sys/class/pwm/pwmchip0/export", pinExport.D11);
var vainqueur = null;
var numUsers = 0;
var equipes = [
	{
		id: "rouge",
		label: "Rouge",
		nbEquipiers: 0,
		score: 0,
		pin: "red"
	},
	{
		id: "vert",
		label: "Vert",
		nbEquipiers: 0,
		score: 0,
		pin: "green"
	},
	{
		id: "bleu",
		label: "Bleu",
		nbEquipiers: 0,
		score: 0,
		pin: "blue"
	},
	
];

function RGBController(options){
	options = options || {};
	var paths = options.paths || {};
	var redPath = paths.red || 'red';
	var greenPath = paths.green || 'green';
	var bluePath = paths.blue || 'blue';
	var period = Number(options.period || 4000000);
	
	var redPWM = new LinuxPWMController(redPath, period);
	var greenPWM = new LinuxPWMController(greenPath, period);
	var bluePWM = new LinuxPWMController(bluePath, period);
	
	var currentColors;
	
	this.initialize = function initialize(){
		return when.all([
			redPWM.enable(),
			greenPWM.enable(),
			bluePWM.enable()
			]).then(function(){
			return whenKeys.all({
				red: redPWM.getPulseWidth(),
				green: greenPWM.getPulseWidth(),
				blue: bluePWM.getPulseWidth()
			});
			}).then(function(initialRGB){
			currentColors = initialRGB;
			console.log(currentColors);
		});
	};
	
	this.setColor = function setColor(red, green, blue){
		console.log(red+" "+green+" "+blue);
		return when.all([
			redPWM.setPulseWidth(red),
			greenPWM.setPulseWidth(green),
			bluePWM.setPulseWidth(blue)
			]).then(function(){
			currentColors = {
				red: red,
				green: green,
				blue: blue
			};
			/* ou ceci en fonction de anode ou cathode commune sur led RGB
				currentColors = {
				red: 1-red,
				green: 1-green,
				blue: 1-blue
			};*/
		});
	};
	
	this.incremente = function incremente(pin, score){
		switch(pin) {
			case 'red':
			redPWM.setPulseWidth(score/255);
			break;
			case 'green':
			greenPWM.setPulseWidth(score/255);
			break;
			case 'blue':
			bluePWM.setPulseWidth(score/255);
			break;
			default:
			console.log( "pb de couleur");
		}}
		
		
		this.getColor = function getColor(){
			return currentColors;
		};
}

var controller = new RGBController(
{
	paths:{
		red: '/sys/class/pwm/pwmchip0/D11',
		green: '/sys/class/pwm/pwmchip0/D10',
		blue: '/sys/class/pwm/pwmchip0/D5'
	}
}
);
controller.initialize();
console.log(controller);
controller.setColor(0,0,0);

//EXPORT PINS & VARIABLES JEU SERVO DE FER
var angle = 90;
var vainqueurServo = null;
write("/sys/class/pwm/pwmchip0/export", pinExport.D9);
write('/sys/class/pwm/pwmchip0/D9/period', "20000000");
function map_range(value, low1, high1, low2, high2) {
	return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
}
function angle2duty_cycle(angle){
	return Math.round(map_range (angle, 0, 180, 560000, 2400000));
}
function sleep( sleepDuration ){
    var now = new Date().getTime();
    while(new Date().getTime() < now + sleepDuration){ /* do nothing */ } 
}
/*
	function setAngle(angle){
	var duty = angle2duty_cycle(angle);
	console.log(duty);
	
	write('/sys/class/pwm/pwmchip0/D9/duty_cycle', duty).then(write('/sys/class/pwm/pwmchip0/D9/enable', "1")).then(sleep(500)).then(console.log("pause")).then(write('/sys/class/pwm/pwmchip0/D9/enable', "0"));	
}*/


function setAngle (angle){
	var duty = angle2duty_cycle(angle);
	//console.log(duty);
	var cmdDuty = 'echo '+duty+'  > /sys/class/pwm/pwmchip0/D9/duty_cycle';
	var go = 'echo 1  > /sys/class/pwm/pwmchip0/D9/enable';
	var stop = 'echo 0  > /sys/class/pwm/pwmchip0/D9/enable';
	exec(cmdDuty, function(error, stdout, stderr) {
		//console.log('duty');
		//console.log(stdout);
		if(stderr){
			console.log(stderr);
		}
	});	
	exec(go, function(error, stdout, stderr) {
		//console.log('go');
		//console.log(stdout);
		if(stderr){
			console.log(stderr);
		}
	});
	sleep(500);
	exec(stop, function(error, stdout, stderr) {
		//console.log('stop');
		//console.log(stdout);
		if(stderr){
			console.log(stderr);
		}
	});
}

function setAngleRapide (angle){
	var duty = angle2duty_cycle(angle);
	//console.log(duty);
	var cmdDuty = 'echo '+duty+'  > /sys/class/pwm/pwmchip0/D9/duty_cycle';
	var go = 'echo 1  > /sys/class/pwm/pwmchip0/D9/enable';
	var stop = 'echo 0  > /sys/class/pwm/pwmchip0/D9/enable';
	exec(cmdDuty, function(error, stdout, stderr) {
		//console.log('duty');
		//console.log(stdout);
		if(stderr){
			console.log(stderr);
		}
	});	
	exec(go, function(error, stdout, stderr) {
		//console.log('go');
		//console.log(stdout);
		if(stderr){
			console.log(stderr);
		}
	});
	//sleep(500);
	exec(stop, function(error, stdout, stderr) {
		//console.log('stop');
		//console.log(stdout);
		if(stderr){
			console.log(stderr);
		}
	});
}

function startServo(){
	setAngle(0);
	sleep(1000);
	setAngle(180);
	sleep(1000);
	setAngle(90);
	sleep(10);
	setAngle(70);
	sleep(10);
	setAngle(110);
	sleep(10);
	setAngle(90);
	
}











/////////////////////////
// LANCEMENT DU SERVEUR//
/////////////////////////

server.listen(port, function () {
	console.log('Server listening at port %d', port);
});

// Routing
app.use(express.static(__dirname + '/public'));

// Render index.html on the main page pour eviter les messages "Cannot GET"
app.get('*', function(req, res){
		console.log(req);
	console.log(res);
//	res.sendFile("/public/index.html", {root: '.'});
res.sendFile("/public/index.html", {root: '.'});
});



io.on('connection', function (socket) {
	console.log("connection");
	
	//SOCKET POUR JEU SSPEED CLIC
	var addedUser = false;
	socket.emit("initEquipes", equipes);
	
	// when the client emits 'new message', this listens and executes
	socket.on('rejoint', function(data){
		//	console.log(data.id);
		for (var i=0; i<equipes.length; i++){
			var eq = equipes[i];
			//  console.log(eq);
			if (eq.id == data.id){
				socket.color = data.id;
				eq.nbEquipiers++;
				io.sockets.emit("initEquipes", equipes);
			}
		}
		
	});
	socket.on('quitte', function(data){
		console.log("QUITTE");
		console.log(data.id);
		socket.color = null;
		for (var i=0; i<equipes.length; i++){
			var eq = equipes[i];
			//  console.log(eq);
			if (eq.id == data.id){
				eq.nbEquipiers--;
				io.sockets.emit("initEquipes", equipes);
			}
		}
	});
	
	// when the user disconnects.. perform this
	socket.on('disconnect', function () {
		console.log('disconnect');
		for (var i=0; i<equipes.length; i++){
			var eq = equipes[i];
			//  console.log(eq);
			if (eq.id == socket.color){
				eq.nbEquipiers--;
				io.sockets.emit("initEquipes", equipes);
			}
		}
		socket.color = null;
		
	});
	
	socket.on('clic', function(data){
		//console.log("CLIC");
		//console.log(data);
		if(vainqueur == null){
			for (var i=0; i<equipes.length; i++){
				var eq = equipes[i];
				//  console.log(eq);
				if (eq.id == data.id){
					eq.score++;
					io.sockets.emit("initEquipes", equipes);
					if(eq.score < 255){
						var pin = eq.pin;
						console.log(pin+" "+eq.score);
						controller.incremente(pin, eq.score);
					}
					else {
						vainqueur = eq;
						io.sockets.emit("vainqueur", eq);
					}
				}
			}
		}
	});
	
	socket.on('start', function(data){
		for (var i=0; i<equipes.length; i++){
			var eq = equipes[i];
			eq.score = 0;
			controller.incremente(eq.pin, eq.score);
			io.sockets.emit("initEquipes", equipes);
			io.sockets.emit("vainqueur", null);
		}
	});
	// faire quitte equipe en cas de deconnexion
	
	
	//SOCKET POUR JEU SERVO DE FER
	socket.on('startServo', function(){
		angle = 90;
		vainqueurServo = null;
		startServo();
		io.sockets.emit("angle", angle);
		io.sockets.emit("vainqueurServo", vainqueurServo);
	});
	socket.on('balance', function(data){
		
		angle = angle+data;
		//	console.log(angle);
		if (vainqueurServo == null){
			if(angle < 0){
				//console.log("g");
				vainqueurServo = "gauche";
				io.sockets.emit("vainqueurServo", vainqueurServo);
				}else if (angle > 180){
				//console.log("d");
				vainqueurServo = "droite";
				io.sockets.emit("vainqueurServo", vainqueurServo);
				}else{
				//console.log(angle);
				setAngleRapide(angle);
				io.sockets.emit("angle", angle);
			}
			}else{
			console.log(vainqueurServo);
		}
		
		
		
		
	});	
	
	
	
	
	});
