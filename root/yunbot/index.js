//https://github.com/ideino/ideino-linino-lib

///////////////////////////////////////////////////////////
// GESTION NODE EXPRESS SERVEUR
///////////////////////////////////////////////////////////
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var port = process.env.PORT || 3006;

// Routing
app.use(express.static(__dirname + '/public'));

//LANCEMENT SERVEUR
server.listen(port, function () {
	console.log('Server listening at port %d', port);
	//console.log('potentiometre : A0');
	
});

///////////////////////////////////////////////////////////
// GESTION DES COMMANDES LINUX comme reboot
///////////////////////////////////////////////////////////
//var exec = require('child_process').exec;

///////////////////////////////////////////////////////////
// GESTION DE LA CARTE ARDUINO
///////////////////////////////////////////////////////////
var linino = require('ideino-linino-lib');
//var sleep = require('sleep');
var board = new linino.Board();
console.log(board);
//html = new linino.Htmlboard();
//var servoH = { pin: board.pin.servo.S9, value : 180 };
//var pin13 = board.pin.digital.D13;
var pot = board.pin.analog.A0;
var pinI1 = board.pin.digital.D8;//define I1 interface
var pinI2= board.pin.digital.D11;//define I2 interface 
var speedpinA= board.pin.pwm.P9;//enable motor A
var pinI3= board.pin.digital.D12;//define I3 interface 
var pinI4= board.pin.digital.D13;//define I4 interface 
var speedpinB= board.pin.pwm.P10;//enable motor B
var spead = 127;//define the spead of motor

var direction = "stop";


console.log(spead);




board.connect(function(){
	board.pinMode(pinI1, board.MODES.OUTPUT);	
	board.pinMode(pinI2, board.MODES.OUTPUT);	
	board.pinMode(speedpinA, board.MODES.PWM);	
	board.pinMode(pinI3, board.MODES.OUTPUT);	
	board.pinMode(pinI4, board.MODES.OUTPUT);	
	board.pinMode(speedpinB, board.MODES.PWM);	
	console.log('CARTE Connected');
	
	/*left();
		sleep(2000); // delay(2000);
		stop();
		right();
		sleep(2000); // delay(2000);
		stop();
		// delay(2000);
		forward();
		sleep(2000); // delay(2000);
		stop();
		backward();
		sleep(2000); // delay(2000);
	stop(); */
	
	
	
	io.on('connection', function (socket) {
		console.log("CLIENT connected");
		socket.emit("speed",spead);
		socket.on("direction", function (data) {
			//console.log(data);
			if (data != direction ) {
				direction = data;
				
				switch(direction) {
					case "left":
					left();
					break;
					case "right":
					right();
					break;
					case "forward":
					forward();
					break;
					case "backward":
					backward();
					break;
					case "stop":
					stop();
					break;
					default:
					stop();
				}			
			}
		});
		socket.on("speed", function (data) {
			spead += data;	
			//console.log(spead);
			this.emit("speed",spead);
		});
	});
	
});	



function backward()
{
	console.log('backward');
	board.analogWrite(speedpinA,spead);//input a simulation value to set the speed
	board.analogWrite(speedpinB,spead);
	board.digitalWrite(pinI4,board.HIGH);//turn DC Motor B move clockwise
	board.digitalWrite(pinI3,board.LOW);
	board.digitalWrite(pinI2,board.LOW);//turn DC Motor A move anticlockwise
	board.digitalWrite(pinI1,board.HIGH);
}
function forward()//
{
	console.log('forward');
	board.analogWrite(speedpinA,spead);//input a simulation value to set the speed
	board.analogWrite(speedpinB,spead);
	board.digitalWrite(pinI4,board.LOW);//turn DC Motor B move anticlockwise
board.digitalWrite(pinI3,board.HIGH);
board.digitalWrite(pinI2,board.HIGH);//turn DC Motor A move clockwise
board.digitalWrite(pinI1,board.LOW);
}
function right()//
{
console.log('right');
board.analogWrite(speedpinA,spead);//input a simulation value to set the speed
board.analogWrite(speedpinB,spead);
board.digitalWrite(pinI4,board.HIGH);//turn DC Motor B move clockwise
board.digitalWrite(pinI3,board.LOW);
board.digitalWrite(pinI2,board.HIGH);//turn DC Motor A move clockwise
board.digitalWrite(pinI1,board.LOW);
}
function left()//
{
console.log('left');
board.analogWrite(speedpinA,spead);//input a simulation value to set the speed
board.analogWrite(speedpinB,spead);
board.digitalWrite(pinI4,board.LOW);//turn DC Motor B move anticlockwise
board.digitalWrite(pinI3,board.HIGH);
board.digitalWrite(pinI2,board.LOW);//turn DC Motor A move clockwise
board.digitalWrite(pinI1,board.HIGH);
}
function stop()//
{
console.log('stop');
board.analogWrite(speedpinA,board.LOW);// Unenble the pin, to stop the motor. this should be done to avid damaging the motor. 
board.analogWrite(speedpinB,board.LOW);
//	sleep(1000); // delay(1000);

}

/**
*  Sleep in millisecond 
*
*  
*/
/*
function sleep( sleepDuration ){
var now = new Date().getTime();
while(new Date().getTime() < now + sleepDuration){ 
// do nothing //
} 
}*/





/*
//. Motor driver shield- 2012 Copyright (c) Seeed Technology Inc.
// 
//  Original Author: Jimbo.we
//  Contribution: LG
//  
//  This library is free software; you can redistribute it and/or
//  modify it under the terms of the GNU Lesser General Public
//  License as published by the Free Software Foundation; either
//  version 2.1 of the License, or (at your option) any later version.
//
//  This library is distributed in the hope that it will be useful,
//  but WITHOUT ANY WARRANTY; without even the implied warranty of
//  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
//  Lesser General Public License for more details.
//
//  You should have received a copy of the GNU Lesser General Public
//  License along with this library; if not, write to the Free Software
//  Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA  02110-1301  USA

int pinI1=8;//define I1 interface
int pinI2=11;//define I2 interface 
int speedpinA=9;//enable motor A
int pinI3=12;//define I3 interface 
int pinI4=13;//define I4 interface 
int speedpinB=10;//enable motor B
int spead =127;//define the spead of motor

void setup()
{
pinMode(pinI1,OUTPUT);
pinMode(pinI2,OUTPUT);
pinMode(speedpinA,OUTPUT);
pinMode(pinI3,OUTPUT);
pinMode(pinI4,OUTPUT);
pinMode(speedpinB,OUTPUT);
}

void forward()
{
analogWrite(speedpinA,spead);//input a simulation value to set the speed
analogWrite(speedpinB,spead);
digitalWrite(pinI4,HIGH);//turn DC Motor B move clockwise
digitalWrite(pinI3,LOW);
digitalWrite(pinI2,LOW);//turn DC Motor A move anticlockwise
digitalWrite(pinI1,HIGH);
}
void backward()//
{
analogWrite(speedpinA,spead);//input a simulation value to set the speed
analogWrite(speedpinB,spead);
digitalWrite(pinI4,LOW);//turn DC Motor B move anticlockwise
digitalWrite(pinI3,HIGH);
digitalWrite(pinI2,HIGH);//turn DC Motor A move clockwise
digitalWrite(pinI1,LOW);
}
void left()//
{
analogWrite(speedpinA,spead);//input a simulation value to set the speed
analogWrite(speedpinB,spead);
digitalWrite(pinI4,HIGH);//turn DC Motor B move clockwise
digitalWrite(pinI3,LOW);
digitalWrite(pinI2,HIGH);//turn DC Motor A move clockwise
digitalWrite(pinI1,LOW);
}
void right()//
{
analogWrite(speedpinA,spead);//input a simulation value to set the speed
analogWrite(speedpinB,spead);
digitalWrite(pinI4,LOW);//turn DC Motor B move anticlockwise
digitalWrite(pinI3,HIGH);
digitalWrite(pinI2,LOW);//turn DC Motor A move clockwise
digitalWrite(pinI1,HIGH);
}
void stop()//
{
digitalWrite(speedpinA,LOW);// Unenble the pin, to stop the motor. this should be done to avid damaging the motor. 
digitalWrite(speedpinB,LOW);
delay(1000);

}

void loop()
{
left();
delay(2000);
stop();
right();
delay(2000);
stop();
// delay(2000);
forward();
delay(2000);
stop();
backward();
delay(2000); 
stop(); 
}


*/








