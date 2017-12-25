function setup(){
	createCanvas(displayWidth, displayHeight, WEBGL);
}

function draw(){
	background(200);
	rotateX(-radians(rotationX));
	rotateY(-radians(rotationY));
	rotateZ(-radians(rotationZ));
	
	
	// translate(100,100,0);
	box(200, 200, 200);
}