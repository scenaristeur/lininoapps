var bpm = 0
var play = false;
// convertisseur mp3 : http://youtubemp3.to/
// bpm search : https://songbpm.com/        https://www.bpmdatabase.com/music/search/?artist=&title=&bpm=70&genre=
// p5js playsound https://p5js.org/examples/sound-load-and-play-sound.html


var song ;
var ROAR_90, GETLUCKY_116, COME_100, WALK_105, CARMEN_150, CRUEL_168;
var slider;

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
	
	
	
	song = ROAR_90;
	fft = new p5.FFT();
	song.amp(0.2);
	//GETLUCKY_116.play();
	//	GETLUCKY_116.pause();
	
	console.log("ready");
	console.log(socket);
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
	text(bpm,100,100);
	
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