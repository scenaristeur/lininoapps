var linino = require('ideino-linino-lib'),
    board = new linino.Board(),
    html = new linino.Htmlboard(),
    http = require('http'),
    stat = require('node-static'),
    file = new stat.Server('./html');
    
var servoH = { pin: board.pin.servo.S9, value : 180 },
    servoV = { pin: board.pin.servo.S10, value : 180 },
    htmlH = { ctrl: 'sliderH' , param : 'value' },
    htmlV = { ctrl: 'sliderV' , param : 'value' };


board.connect(function(){
    
    http.createServer(function(req, res) {
        file.serveFile('/servo-twins.html', 200, {}, req, res);
    }).listen(1337);
    
    board.pinMode(servoH.pin, board.MODES.SERVO);
    board.pinMode(servoV.pin, board.MODES.SERVO);
    
    html.read(htmlH.ctrl, htmlH.param, function(data){
        board.servoWrite(servoH.pin, Number(data.value));
    });
    
    html.read(htmlV.ctrl, htmlV.param, function(data){
        board.servoWrite(servoV.pin, Number(data.value));
    }); 
});