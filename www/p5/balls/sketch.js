/*
	* @name Acceleration Ball Bounce
	* @description Move an ellipse around based on accelerationX and accelerationY values, and bounces when touch the edge of the canvas.
*/

var balls = [];

var vMultiplier = 0.007;
var bMultiplier = 0.6;

function setup() {
    createCanvas(displayWidth, displayHeight);
	//background(255); // pour jeu où il faut recouvrir toute une zone , ou ne pas recouvrir
	for (var i=0;i<30;i++){
		var ball = new Ball();
		balls[i] = ball;
	}
    fill(0);
}

function draw() {
    background(255);
	for (var i=0;i<balls.length;i++){
		var ball = balls[i];
		ball.move();
		ball.display();
	}
	
}


function Ball(){
	// Position Variables
	this.x = displayWidth /2+random(-100,100);
	this.y = displayHeight /2+random(-100,100);
	// Speed - Velocity
	this.vx = 0;
	this.vy = 0; 
	// Acceleration
	this.ax = 0;
	this.ay = 0;
	// Mass
	this.mass = random(5,35);
	
	console.log(this);
	
	
	this.move = function() {
		
		//ax = accelerationX;
		//ay = accelerationY;
		//Acceleration inversement proportionnelle au poids
		this.ax = rotationX*this.mass/10;
		this.ay = rotationY*this.mass/10;
		
		this.vx = this.vx + this.ay;
		this.vy = this.vy + this.ax;
		this.y = this.y + this.vy * vMultiplier; 
		this.x = this.x + this.vx * vMultiplier;
		
		// Bounce when touch the edge of the canvas
		if (this.x < 0) { 
			this.x = 0; 
			this.vx = -this.vx * bMultiplier; 
		}
		if (this.y < 0) { 
			this.y = 0; 
			this.vy = -this.vy * bMultiplier; 
		}
		if (this.x > width - 20) { 
			this.x = width - 20; 
			this.vx = -this.vx * bMultiplier; 
		}
		if (this.y > height - 20) { 
			this.y = height - 20; 
			this.vy = -this.vy * bMultiplier; 
		}	
	}
	
	this.display = function(){
		ellipse(this.x, this.y, this.mass, this.mass);
	}	
}

