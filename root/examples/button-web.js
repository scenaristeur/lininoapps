/***
 * file: button-web.js
 * releated files: ./html/button-web.html
 * version: 3.0
 * authors: https://github.com/quasto, 
 *          https://github.com/sebba
 * license: mit
 * description: this example create a simple http server that responds with a page
 *              (html/page-server-side-read.html); this page contains button which 
 *              update its param value in the onclick function. The example below 
 *              will read the param value of the button and send the LOW or HIGH 
 *              value to the digital LED 13.
 ***/

var linino = require('ideino-linino-lib'),
    board = new linino.Board(),
    html = new linino.Htmlboard(),
    http = require('http'),
    stat = require('node-static'),
    file = new stat.Server('./html');
    
//local variable 
var pin13 = board.pin.digital.D13,
    html_btn_id = 'btnswitch';
    
board.connect(function(){
    //SIMPLE HTTP SERVER
    http.createServer(function(req, res) {
        file.serveFile('/button-web.html', 200, {}, req, res);
    }).listen(1337);
  
    board.pinMode(pin13, board.MODES.OUTPUT);    
    
    html.read(html_btn_id,'value',function(data){
        if(data.value == 'ON')
            board.digitalWrite(pin13, board.HIGH);
        else
            board.digitalWrite(pin13, board.LOW);
    });  
});