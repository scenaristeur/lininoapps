//var exec = require('child_process').exec;
var servo = require('./lib/servo');

servo.attach(); 

var angles = [0, 90, 45, 70, 180, 0];
for (var i=0; i<angles.length; i++){
	var a = angles[i];
	servo.write(a);
	servo.sleep(1000);
}
//write(0);






