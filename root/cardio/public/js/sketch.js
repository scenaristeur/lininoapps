var bpm = 0
var play = false;
// convertisseur mp3 : http://youtubemp3.to/
// bpm search : https://songbpm.com/        https://www.bpmdatabase.com/music/search/?artist=&title=&bpm=70&genre=
// p5js playsound https://p5js.org/examples/sound-load-and-play-sound.html


var song ;
var ROAR_90, GETLUCKY_116, COME_100, WALK_105, CARMEN_150, CRUEL_168;
var slider;
var slider2;

// variables pour la mesure 
var alpha;
var period;
var change ;
var oldValue;
var oldChange;
var start;
var mesures = [];
var seuil = 0;


function preload() {
	// soundFormats('mp3', 'ogg');
	// trover des chansons de 40 BPM à 220
 	ROAR_90 = loadSound('assets/90BPM - Katy Perry - Roar Official.mp3');
	COME_100 = loadSound('assets/100BPM - Jain - Come.mp3');
	WALK_105 = loadSound('assets/105BPM - Lou Reed - Walk On The Wild Side.mp3');
	GETLUCKY_116 = loadSound('assets/116BPM - Daft Punk - Get Lucky.mp3');
	CARMEN_150 = loadSound('assets/150BPM - Stromae - carmen.mp3');
	CRUEL_168 = loadSound('assets/168BPM - Elvis Presley - Dont Be Cruel.mp3');
	console.log("chansons chargées");
}

function setup() {
	canvas = createCanvas(windowWidth, windowHeight);
	slider = createSlider(40, 220, 70);
	slider.position(10, 10);
	slider.style('width', width/2+'px');
	
	slider2 = createSlider(0, 1023, 0);
	slider2.position(10, 40);
	slider2.style('width', width/2+'px');
	
	alpha = 0.75;
	period = 20;
	change = 0.0;
	oldValue = 0;
	oldChange = 0;
	start = 0;
	
	
	
	song = ROAR_90;
	fft = new p5.FFT();
	song.amp(0.2);
	//GETLUCKY_116.play();
	//	GETLUCKY_116.pause();
	
	console.log("ready");
	console.log(socket);
	
	
	socket.on('seuil', function(data){
		
		seuil = data;
		console.log(seuil);
	});
	
	socket.on('mesure', function(data){
		//console.log(data);
		seuil = data.seuil;
		var value = alpha * oldValue + (1 - alpha) * data.val;
		data.value = value;
		//console.log(value);
		slider2.value(value);
		change = oldValue - value;
		data.change = change;
		//console.log(change);
		/*if (Math.sign(change) != Math.sign(oldChange)){
			// crete
			var now = data.t;
			t =  now - start;
			var p = t*2; //periode
			var bpm = 60000 / p;
			console.log(p);
			start = now;
			
		}*/
		
		oldValue = value;
		oldChange = change;
		
		mesures.push(data);
		while (mesures.length > 100){
			//console.log('shift');
			mesures.shift();
		}
	});
	
	
  	socket.on('update', function (data) {
		
		//var json = JSON.parse(data);
		
		bpm = Math.round(map(data,0,1023,40,220));
		console.log(bpm);
		slider.value(bpm);
		changeSong(ROAR_90, bpm, 80, 95);
		changeSong(COME_100, bpm, 95, 102);
		changeSong(WALK_105, bpm, 102, 110);
		changeSong(GETLUCKY_116, bpm, 110, 120);
		changeSong(CARMEN_150, bpm, 120, 160);
		changeSong(CRUEL_168, bpm, 160, 220);
	});
}

function draw() {
	var color = map(bpm,40,220,0,255);
	background(color);
	noStroke();
	//fill(255-color);
	fill(bpm, 255-bpm, 0);
	ellipse(width/2,height/2,bpm,bpm);	
	
	//text(mesures, 100, 200);
	//fill(255,255,0);
	stroke(255,255,0);
	strokeWeight(1);
	noFill();
	/*for (var m = 0; m <mesures.length; m++){
		var t = map(m, 0, mesures.length, 0, width);
		//var t = mesures[m].t;
		var v = - height +map(mesures[m].val-800, 0,255, height, 0);
		rect(t, height, width/mesures.length, v);
	}*/
	
	
	
	
	
	
	if (mesures.length>1){
		//affiche dernière valeur
		var m = mesures[mesures.length-1];
		//console.log(m);
		stroke(0,255,255);
		strokeWeight(1);
		/*if ( Math.abs(m.change) > 0.4 ){
			fill(0,255,255,30);
		}
		else{
			noFill();
		}*/
		
		text("oxygène dans le sang : "+m.val,100,100);
		text("oxygène dans le sang (lissé): "+m.value,100,120);
		ellipse(width/4,height/2,m.val,m.val);
		ellipse(width/4,height/2,m.value,m.value);
	}
	
	/// AFFICHE SEUIL
	stroke(255,255,0);
	strokeWeight(1);
	noFill();
	//var s = map (seuil, 0, 1023, 0, height/2);
	text("seuil : "+seuil,100,140);
	ellipse( width/4,height/2, seuil, seuil);
	
	
	
	
	
	
	/*
	
	for (var i = 0; i< mesures.length; i++){
		//console.log(Date.now()-mesures[i].t);
		var x = map(Date.now()-mesures[i].t, 5000, 0, width/2, width);
		var h =height - map(mesures[i].value, 920, 1050, 0, height/2);
		//rect(x, height/2, width / mesures.length, h )
		line (x, height/2, x, h);
		//line (mouseX, mouseY, x, h);
	}
	*/
	
	
	
	
	//visu
	var spectrum = fft.analyze();
	noStroke();
	fill(0,255,0); // spectrum is green
	for (var i = 0; i< spectrum.length; i++){
		var x = map(i, 0, spectrum.length, 0, width);
		var h = -height + map(spectrum[i], 0, 255, height, 0);
		rect(x, height, width / spectrum.length, h )
	}
	
	var waveform = fft.waveform();
	noFill();
	beginShape();
	stroke(255,0,0); // waveform is red
	strokeWeight(1);
	for (var i = 0; i< waveform.length; i++){
		var x = map(i, 0, waveform.length, 0, width);
		var y = map( waveform[i], -1, 1, 0, height);
		vertex(x,y);
	}
	endShape();
	
	// cardio wave
	/*beginShape();
		stroke(255,255,0); // waveform is red
		strokeWeight(1);
		for (var i = 0; i< mesures.length; i++){
		var x = map(i, 0, mesures.length, 0, width);
		var y = map( mesures[i], -1, 1, 0, height);
		vertex(x,y);
		}
	endShape();*/
	
	
	
}


function changeSong(s, bpm, min, max){
	if ((bpm > min ) && (bpm <= max) && (song != s )){
		//ROAR_90.pause();
		song.pause();
		song = s;
		song.play()
		console.log(s);
	}
	
	
}


function mousePressed() {
	play = !play;
	console.log(play);
	if (play){
		console.log("play");
		song.play();
		
		}else{
		console.log("stop");
		song.stop();
	}
}			