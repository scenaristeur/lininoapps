/***
 * file: blink.js
 * version: 2.0
 * author: https://github.com/quasto
 * based on: http://arduino.cc/en/Tutorial/Fade
 * license: mit
 * description: in this example the board led on digital pin 13 and
 *      a lightbulb image on web page will blink every 1 second .
 ***/
 
var linino = require('ideino-linino-lib'),
    board = new linino.Board(),
    led = 'P9';

board.connect(function(){
    board.pinMode(led, board.MODES.PWM);
    var brightness = 0,
    fadeStep = 5;
    
    setInterval(function(){
        board.analogWrite(led, brightness);
        brightness = brightness + fadeStep;
        
        if (brightness == 0 || brightness == 255) {
            fadeStep = -fadeStep; 
        }
    
    },30);
});