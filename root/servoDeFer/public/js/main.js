var socket = io();
var tickDelay = 100; // 15ms selon source, tempo pour envoi du snapshot par le serveur
var data = {"d" : 0, "g" : 0};

tickInterval = setInterval(function(){
	if( data.d > 0 || data.g > 0){
		var difference = data.g - data.d;
		socket.emit('servoMove', difference);
		data = {"d" : 0, "g" : 0};
	}
}, tickDelay);

function start(){
	//console.log("start");
	socket.emit('start');
}

function gauche(){
	data.g++;
}

function droite(){
	data.d++;
}

socket.on('start', function (data) {
	updateDom("start");
	updateDom("angle", data);
	data = {"d" : 0, "g" : 0};
	//console.log(data.toString());
});

socket.on('angle', function (data) {
	//console.log(data.toString());
	updateDom("angle", data);
});

socket.on('vainqueur', function (data) {
	console.log(data.toString());
	updateDom("vainqueur", data);
});


function updateDom(param, data){
	var gaucheBTN = document.getElementById("gaucheBTN");
	var droiteBTN = document.getElementById("droiteBTN");
	var startBTN = document.getElementById("startBTN");
	var vainqueurLbl = document.getElementById("vainqueurLbl");
	var angleLbl = document.getElementById("angleLbl");
	
	switch(param) {
		case "init":
		//console.log("init");
		startBTN.disabled = false;
		gaucheBTN.disabled = true; // style.display = "none"
		droiteBTN.disabled = true;
		break;
		case "start":
		//console.log("start");
		startBTN.disabled = true;
        gaucheBTN.disabled = false; // style.display = "none"
		droiteBTN.disabled = false;
		vainqueurLbl.innerHTML = "" ;
        break;
		case "angle":
		//console.log("angle");
		startBTN.disabled = true;
		angleLbl.innerHTML = data; 
        break;
		case "vainqueur":
		//console.log("vainqueur");
		if (data == "d"){
			vainqueurLbl.innerHTML = "équipe DROITE gagnante" ;
		}
		else if (data == "g"){
			vainqueurLbl.innerHTML = "équipe GAUCHE gagnante" ;
		}
		startBTN.disabled = false;
		gaucheBTN.disabled = true; // style.display = "none"
		droiteBTN.disabled = true;
		angleLbl.innerHTML = "";
        break;
		default:
        console.log("inconnu");
	}	
}

updateDom("init");


