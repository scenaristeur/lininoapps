
var x, y, z;

function setup(){
	createCanvas(displayWidth, displayHeight, WEBGL);
}

function draw(){
	background(200);
	rotateX(-radians(rotationX));
	rotateY(-radians(rotationY));
	rotateZ(-radians(rotationZ));
	
	
	 translate(-100,-100,0);
	 box(100, 50, 20);
	 translate(100,100,0);
	sphere(10);
	//text(rotationX+" "+rotationY+" "+rotationZ);
}