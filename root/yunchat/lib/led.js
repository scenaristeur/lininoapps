//http://www.arduino.org/learning/tutorials/advanced-guides/how-to-pilot-gpio-on-lininoio-2

var exec = require('child_process').exec;


exports.attach = function(){
	var cmdExport = 'echo 115 > /sys/class/gpio/export';
	var cmdMode = 'echo out > /sys/class/gpio/D13/direction';
	exec(cmdExport, function(error, stdout, stderr) {
		if(stderr){
			console.log(stderr);
		}
	});	
	exec(cmdMode, function(error, stdout, stderr) {
		if(stderr){
			console.log(stderr);
		}
	});	
}

exports.write = function(val){
	var cmdWrite = 'echo '+val+' > /sys/class/gpio/D13/value';
		exec(cmdWrite, function(error, stdout, stderr) {
		if(stderr){
			console.log(stderr);
		}
	});	
}
