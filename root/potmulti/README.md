Objectif : utiliser un potentiomètre pour agir sur une page Web : 
- matériel carte SmagYun avec Lininoio (http://smag0.blogspot.fr/2017/08/smagyun-comment-acceder-aux.html)
- un potentiomètre : pin du milieu sur A0, 1 pin externe sur Gnd, l'autre sur 5V.

Sur la carte créez un dossier pot2web, vous déplacer dedans, et lanceer 'npm init' pour initialiser l'application :
```
mkdir pot2web
cd pot2web
npm init
```
ce qui nous donne :
```
This utility will walk you through creating a package.json file.
It only covers the most common items, and tries to guess sane defaults.

See `npm help json` for definitive documentation on these fields
and exactly what they do.

Use `npm install <pkg> --save` afterwards to install a package and
save it as a dependency in the package.json file.

Press ^C at any time to quit.
name: (pot2web)
version: (0.0.0)
description:
entry point: (index.js)
test command:
git repository:
keywords:
author:
license: (ISC)
About to write to /root/pot2web/package.json:

{
  "name": "pot2web",
  "version": "0.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC"
}


Is this ok? (yes)
```
validez par 'y'
et installez les packages 'node-express' et 'node-socket.io' si ce n'est déjà fait :
```
opkg install node node-express node-socket.io
```
créez un fichier 'index.js' à la racine du projet :  

```
///////////////////////////////////////////////////////////
// GESTION NODE EXPRESS SERVEUR
///////////////////////////////////////////////////////////
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var port = process.env.PORT || 3005;


// Routing
app.use(express.static(__dirname + '/public'));

//LANCEMENT SERVEUR
server.listen(port, function () {
	console.log('Server listening at port %d', port);
});

```
créez un dossier 'public' et un fichier 'index.html' dans ce dossier public : 
mkdir public && cd public && vi index.html

```
<!DOCTYPE html>
<html>
  <body>
HELLO, 
consultez la console javascript en appuyant sur Ctrl+Maj+I
  <script src="/socket.io/socket.io.js"></script>
  <script>
	var socket = io();
	console.log(socket);
  </script>
  </body>
</html>
```
test avec node .
si tout va bien vous devriez voir 'Server listening at port 3005 ', ceci indique que le serveur nodejs est opérationnel sur le port 3005.
En consultant la page web à l'adresse : http://<adresse_IP_de_votre_carte>:3005 (exemple : http://192.168.1.43:3005 )
Vous devriez voir une page marquée 'HELLO, consultez la console javascript en appuyant sur Ctrl+Maj+I' , allez donc voir la console, celle-ci devrait vous afficher la Socket (https://socket.io/) qui nous permettra d'effectuer des communications bidirectionnelles entre la page web et le serveur.

Installez ensuite node-ideino-linino-lib : 
``` 
opkg install node-ideino-linino-lib
```
Et Modifier index.js
```
///////////////////////////////////////////////////////////
// GESTION NODE EXPRESS SERVEUR
///////////////////////////////////////////////////////////
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var port = process.env.PORT || 3005;


///////////////////////////////////////////////////////////
// GESTION DE LA CARTE ARDUINO
///////////////////////////////////////////////////////////
var linino = require('ideino-linino-lib'),
board = new linino.Board(),
html = new linino.Htmlboard();
//var servoH = { pin: board.pin.servo.S9, value : 180 };
//var pin13 = board.pin.digital.D13;
var pot = board.pin.analog.A0;

// Routing
app.use(express.static(__dirname + '/public'));

//LANCEMENT SERVEUR
server.listen(port, function () {
	console.log('Server listening at port %d', port);
	console.log('potentiometre : A0');

});
board.connect(function(){
	console.log('CARTE Connected');
	io.on('connection', function (socket) {
		console.log("CLIENT connected");


		board.analogRead(pot, function(value){
			console.log('value: ' + value);
		//	var data = {"AO": value};
			socket.emit('update', value);
		});
	});

});
```
ainsi que public/index.html :
```
<!DOCTYPE html>
<html>
  <head>
    <meta name="viewport" width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0>
    <style> body {padding: 0; margin: 0;} </style>
    <script src="lib/p5.min.js"></script>
    <script src="lib/addons/p5.dom.min.js"></script>
    <script src="lib/addons/p5.sound.min.js"></script>
    <script src="js/sketch.js"></script>
  </head>
  <body>

  <script src="/socket.io/socket.io.js"></script>
  <script>
	var socket = io();
	console.log(socket);
	socket.on('update', function (data) {
		console.log(data);
	});

  </script>
  </body>
</html>
```
avec public/js/sketch.js :
```
var diametre = 0


function setup() {
	canvas = createCanvas(windowWidth, windowHeight);
	console.log("ready");
	console.log(socket);
  	socket.on('update', function (data) {
		console.log(data);
		//var json = JSON.parse(data);
		diametre = data;
		console.log(diametre);
	});
}

function draw() {
	var color = map(diametre,0,1023,0,255);
	background(color);
	noStroke();
	fill(255-color);
	ellipse(width/2,height/2,diametre,diametre);
}
```
Telecharger P5js et inclure les les fichiers dans public/lib en respectant la structure utilisée ici :
https://github.com/scenaristeur/lininoapps/tree/master/root/pot2web

relancez l'appli avec 'node .' et vous devriez voir dans votre page Web un cercle s'animer lorsque vous changez la valeur du potentiomètre.


