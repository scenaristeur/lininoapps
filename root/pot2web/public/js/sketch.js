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
