/***
 * file: blink.js
 * version: 2.0
 * author: https://github.com/quasto
 * license: mit
 * description: in this example the board led on digital pin 13 and
 *      a lightbulb image on web page will blink every 1 second .
 ***/
 
var linino = require('ideino-linino-lib'),
    board = new linino.Board(),
    html = new linino.Htmlboard(),
    http = require('http'),
    stat = require('node-static'),
    file = new stat.Server('./html');
    
var pin13 = board.pin.digital.D13,
    html_img_id = 'lightbulb',    
    light_off ='/img/lightbulb-off.jpg',
    light_on = '/img/lightbulb-on.jpg',
    light = light_off, 
    ctrl = board.LOW;
    
board.connect( function(){  
    //SIMPLE HTTP SERVER
    http.createServer(function(req, res) {
       if(req.url == '/' )
            file.serveFile('/lightbulb.html', 200, {}, req, res);
       else
            file.serve(req, res);       
    }).listen(1337);
    
    board.pinMode(pin13, board.MODES.OUTPUT);
    
    setInterval(function(){
        board.digitalWrite(pin13, ctrl);
        html.write(html_img_id,'src', light);
        light = ctrl == board.HIGH ? light_off : light_on;
        ctrl = ctrl == board.HIGH ? board.LOW : board.HIGH;        
    },1000);
});