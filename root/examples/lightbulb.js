/***
 * file: lightbulb.js
 * releated files: ./html/lightbulb.html
 * version: 3.0
 * authors: https://github.com/quasto, 
 *          https://github.com/sebba
 * license: mit
 * description: this example create a simple http server that responds with a page
 *              (html/page-server-side-write.html); this page contains an <img> tag
 *              to show a light bulb image. Also there's a button connected at
 *              digital pin 8. When the button will pressed or realesed tha image
 *              of the light bulb on the page will change.
 ***/
 
var linino = require('ideino-linino-lib'),
    board = new linino.Board(),
    html = new linino.Htmlboard(),
    http = require('http'),
    stat = require('node-static'),
    file = new stat.Server('./html');
    
//local variable 
var pin8 = board.pin.digital.D8,
    html_img_id = 'lightbulb',    
    light_off ='/img/lightbulb-off.jpg',
    light_on = '/img/lightbulb-on.jpg';

board.connect(function(){
    //SIMPLE HTTP SERVER
    http.createServer(function(req, res) {
       if(req.url == '/' )
            file.serveFile('/lightbulb.html', 200, {}, req, res);
       else
            file.serve(req, res);       
    }).listen(1337);
  
    board.pinMode(pin8, board.MODES.INPUT);   
    board.digitalRead(pin8, function( data ){console.log(data)
        if(data.value === 0)
            html.write(html_img_id,'src',light_off);
        else
            html.write(html_img_id,'src',light_on);
    }); 
});