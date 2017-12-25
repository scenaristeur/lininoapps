//http://www.arduino.org/learning/tutorials/advanced-guides/how-to-pilot-gpio-on-lininoio-2

var exec = require('child_process').exec;

exports.write = function (angle){
	var duty = angle2duty_cycle(angle);
	console.log(duty);
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
	this.sleep(500);
	exec(stop, function(error, stdout, stderr) {
		//console.log('stop');
		//console.log(stdout);
		if(stderr){
			console.log(stderr);
		}
	});
}

exports.attach = function(){
	var cmdExport = 'echo 1 > /sys/class/pwm/pwmchip0/export';
	var cmdPeriod = 'echo 20000000  > /sys/class/pwm/pwmchip0/D9/period';
	
	exec(cmdExport, function(error, stdout, stderr) {
		//console.log('export');
		//console.log(stdout);
		//console.log(stderr);
	});
	exec(cmdPeriod, function(error, stdout, stderr) {
		//console.log('period');
		// console.log(stdout);
		//console.log(stderr);
	});
}

function map_range(value, low1, high1, low2, high2) {
	return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
}
function angle2duty_cycle(angle){
	return Math.round(map_range (angle, 0, 180, 560000, 2400000));
}
exports.sleep = function ( sleepDuration ){
    var now = new Date().getTime();
    while(new Date().getTime() < now + sleepDuration){ /* do nothing */ } 
}


/*
	echo 1 > /sys/class/pwm/pwmchip0/export
	echo 20000000  > /sys/class/pwm/pwmchip0/D9/period
	echo 560000  > /sys/class/pwm/pwmchip0/D9/duty_cycle
	echo 1  > /sys/class/pwm/pwmchip0/D9/enable
*/
//gestion YUN