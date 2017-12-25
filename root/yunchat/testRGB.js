

//var exec = require('child_process').exec;
var rgb = require('./lib/rgb');
var redPin = 6;
var greenPin = 5;
var bluePin = 3;

rgb.attach(redPin, greenPin, bluePin);

rgb.setColor(255,0,255);


/*
var angles = [0, 90, 45, 70, 180, 0];
for (var i=0; i<angles.length; i++){
	var a = angles[i];
	servo.write(a);
	servo.sleep(1000);
}*/


/*

 
int redPin = 11;
int greenPin = 10;
int bluePin = 9;
 
//uncomment this line if using a Common Anode LED
//#define COMMON_ANODE
 
void setup()
{
  pinMode(redPin, OUTPUT);
  pinMode(greenPin, OUTPUT);
  pinMode(bluePin, OUTPUT);  
}
 
void loop()
{
  setColor(255, 0, 0);  // red
  delay(1000);
  setColor(0, 255, 0);  // green
  delay(1000);
  setColor(0, 0, 255);  // blue
  delay(1000);
  setColor(255, 255, 0);  // yellow
  delay(1000);  
  setColor(80, 0, 80);  // purple
  delay(1000);
  setColor(0, 255, 255);  // aqua
  delay(1000);
}
 
void setColor(int red, int green, int blue)
{
  #ifdef COMMON_ANODE
    red = 255 - red;
    green = 255 - green;
    blue = 255 - blue;
  #endif
  analogWrite(redPin, red);
  analogWrite(greenPin, green);
  analogWrite(bluePin, blue);  
}

*/