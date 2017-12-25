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


var exec = require('child_process').exec;
var rPin , gPin, bPin;

exports.attach = function (r, g, b){
	//TODO : convertir les PINs
	this.rPin = r;
	this.gPin = g;
	this.bPin = b;
	var cmdExportR = 'echo 123 > /sys/class/pwm/pwmchip0/export';
	var cmdExportG = 'echo 114 > /sys/class/pwm/pwmchip0/export';
	var cmdExportB = 'echo 116 > /sys/class/pwm/pwmchip0/export';
	var cmdModeR = 'echo out > /sys/class/pwm/pwmchip0/D'+r+'/direction';
	var cmdModeG = 'echo out > /sys/class/pwm/pwmchip0/D'+g+'/direction';
	var cmdModeB = 'echo out > /sys/class/pwm/pwmchip0/D'+b+'/direction';
	
	exec(cmdExportR, function(error, stdout, stderr) {
		if(stderr){
			console.log(stderr);
		}
	});
	
	
	exec(cmdExportG, function(error, stdout, stderr) {
		if(stderr){
			console.log(stderr);
		}
	});
	exec(cmdExportB, function(error, stdout, stderr) {
		if(stderr){
			console.log(stderr);
		}
	});
	
	exec(cmdModeR, function(error, stdout, stderr) {
		if(stderr){
			console.log(stderr);
		}
	});	
	
	
	exec(cmdModeG, function(error, stdout, stderr) {
		if(stderr){
			console.log(stderr);
		}
	});	
	
	
	exec(cmdModeB, function(error, stdout, stderr) {
		if(stderr){
			console.log(stderr);
		}
	});	


}


exports.setColor = function(red, green, blue){
		var cmdWriteRed = 'echo '+red+' > /sys/class/pwm/pwmchip0/D'+this.rPin+'/duty_cycle';
		var cmdWriteGreen = 'echo '+green+' > /sys/class/pwm/pwmchip0/D'+this.gPin+'/duty_cycle';
		var cmdWriteBlue = 'echo '+blue+' > /sys/class/pwm/pwmchip0/D'+this.bPin+'/duty_cycle';
		exec(cmdWriteRed, function(error, stdout, stderr) {
		if(stderr){
			console.log(stderr);
		}
	});	
	
		exec(cmdWriteGreen, function(error, stdout, stderr) {
		if(stderr){
			console.log(stderr);
		}
	});	
	
		exec(cmdWriteBlue, function(error, stdout, stderr) {
		if(stderr){
			console.log(stderr);
		}
	});	
	
	}		