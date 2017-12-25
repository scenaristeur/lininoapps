/***
 * file: blink.js
 * version: 2.0
 * author: https://github.com/andrea-83
 * based on: http://www.princetronics.com/supermariothemesong/
 * license: mit
 * description: play super mario theme song with a piezo buzzer.
 ***/
 
var linino = require('ideino-linino-lib'),
    board = new linino.Board(),
    tone = require('./resources/tones.json'),
    buz = board.pin.pwm.P5;

board.connect(function(){
    
    var del = 0;
    var melody = ["NOTE_E7", "NOTE_E7", "0", "NOTE_E7","0", "NOTE_C7", "NOTE_E7", "0","NOTE_G7","0","0","0","NOTE_G6","0","0","0","NOTE_C7","0","0","NOTE_G6","0","0", "NOTE_E6","0","0","NOTE_A6","0", "NOTE_B6","0", "NOTE_AS6", "NOTE_A6","0","NOTE_G6", "NOTE_E7", "NOTE_G7", 
    "NOTE_A7", "0", "NOTE_F7", "NOTE_G7", "0", "NOTE_E7", "0","NOTE_C7", "NOTE_D7", "NOTE_B6", "0", "0","NOTE_C7", "0", "0", "NOTE_G6", "0","0", "NOTE_E6","0","0", "NOTE_A6", "0", "NOTE_B6", "0", "NOTE_AS6", "NOTE_A6", "0", "NOTE_G6", "NOTE_E7", "NOTE_G7", 
    "NOTE_A7", "0", "NOTE_F7", "NOTE_G7", "0", "NOTE_E7", "0","NOTE_C7","NOTE_D7", "NOTE_B6", "0", "0"];
        
    var times =[
    120, 120, 120, 120,
    120, 120, 120, 120,
    120, 120, 120, 120,
    120, 120, 120, 120,
 
    120, 120, 120, 120,
    120, 120, 120, 120,
    120, 120, 120, 120,
    120, 120, 120, 120,
 
    90, 90, 90,
    120, 120, 120, 120,
    120, 120, 120, 120,
    120, 120, 120, 120,
 
    120, 120, 120, 120,
    120, 120, 120, 120,
    120, 120, 120, 120,
    120, 120, 120, 120,
 
    90, 90, 90,
    120, 120, 120, 120,
    120, 120, 120, 120,
    120, 120, 120, 120
    ];
        
    board.pinMode(buz, board.MODES.PWM);

    for( thisNote = 0; thisNote < melody.length; thisNote++){               
        sendsound( tone.tone[ melody[thisNote] ], del); 
        del = times[ thisNote ] + del;
    }
    
    function sendsound(sound, time){        
        setTimeout(function(){
            board.tone(buz, sound);
        },time);
    }

});