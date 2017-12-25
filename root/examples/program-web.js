/***
 * file: program-web.js
 * releated files: ./html/program-web.html
 * version: 3.0
 * authors: https://github.com/quasto, 
 *          https://github.com/sebba
 * license: mit
 * description: this example create a simple http server that responds with a page
 *              (html/page-client-side.html). This page contains some buttons that 
 *              allows the user to send the common commands directly to the board, 
 *              ie: pinMode, digitalRead, digitalWrite, etc..
 ***/
 
var linino = require('ideino-linino-lib'),
    board = new linino.Board(),
    html = new linino.Htmlboard(),
    http = require('http'),
    stat = require('node-static'),
    file = new stat.Server('./html');
    
board.connect(function(){
  //SIMPLE HTTP SERVER
    http.createServer(function(req, res) {
        file.serveFile('/program-web.html', 200, {}, req, res);
    }).listen(1337);
});