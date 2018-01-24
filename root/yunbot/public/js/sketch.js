//var diametre = 0
var x, y;
var direction = "stop";
var speed = 0;
var joystick1, joystick2;






function setup() {
	//canvas = createCanvas(400, 400);
	x = width/2-25;
	y = height/2-25;
	console.log("ready");
	console.log(socket);
	socket.on("speed", function (data) {
		console.log(data);	
		speed = data;
	});
	
	// 
	joystick1	= new VirtualJoystick({
		container	: document.body,
		strokeStyle	: 'cyan',
		limitStickTravel: true,
		stickRadius	: 120,	
	});
	joystick1.addEventListener('touchStartValidation', function(event){
		event.preventDefault();
		var touch	= event.changedTouches[0];
		if( touch.pageX < window.innerWidth/2 )	return false;
		return true
	});
	joystick1.addEventListener('touchStart', function(event){
		event.preventDefault();
		console.log('move');
	})
	joystick1.addEventListener('touchEnd', function(event){
		event.preventDefault();
		socket.emit("direction", "stop");
		console.log('stop');
	})
	joystick1.addEventListener('touchMove', function(event){
		event.preventDefault();
		
	})
	
	
	
	//joystick2
	// one on the right of the screen
	joystick2	= new VirtualJoystick({
		container	: document.body,
		strokeStyle	: 'orange',
		limitStickTravel: true,
		stickRadius	: 120		
	});
	joystick2.addEventListener('touchStartValidation', function(event){
		event.preventDefault();
		var touch	= event.changedTouches[0];
		if( touch.pageX >= window.innerWidth/2 )	return false;
		return true
	});
	joystick2.addEventListener('touchStart', function(event){
		event.preventDefault();
		console.log('fire');
	})
	
	
}

function draw() {
	background(127);
	var d = direction;
	//JOYSTICK
	if( joystick1.left() ){
	console.log("left");
		//cube.position.x = cube.position.x - 60 * frameTime;     
		if (d != "left"){  d = "left" ;}
		socket.emit("direction", "left");
	}
	if( joystick1.right() ){
	console.log("right");
		//cube.position.x = cube.position.x + 60 * frameTime;  
		if (d != "right"){  d = "right";}
		socket.emit("direction", "right");
	}
	if( joystick1.down() ){
	console.log("down");
		//cube.position.y = cube.position.y - 60 * frameTime;
		if (d != "backward"){  d = "backward";}
		socket.emit("direction", "backward");
	}
	if( joystick1.up() ){
	console.log("up");
		//cube.position.y = cube.position.y + 60 * frameTime;       
		if (d != "forward"){ d = "forward";}
		socket.emit("direction", "forward");
	}
	
	
	//FLECHES CLAVIER
    if (keyIsPressed) { 
        if (keyCode == LEFT_ARROW) {
			if (d != "left"){  d = "left" ;}
			x--;
			}else 		if (keyCode == RIGHT_ARROW) {
			if (d != "right"){  d = "right";}
			x++;
			}else 		if (keyCode == DOWN_ARROW) {
			if (d != "backward"){  d = "backward";}
			y++;
			} else 		if (keyCode == UP_ARROW) {
			if (d != "forward"){ d = "forward";}
			y--;
		}  
		else 		if (keyCode == BACKSPACE) {
			socket.emit("speed", -1); //diminue la vitesse de 10
		}  
		else 		if (keyCode == DELETE) {
			socket.emit("speed", 1);// augmente la vitesse de 10
		}  
		if(d != direction){
			//console.log(d);
			direction = d;
			socket.emit("direction", direction);
		}
		return false; // prevent any default behaviour
	}
	else{
		d = "stop";
	}	
	if(d != direction){
		//console.log(d);
		direction = d;
		socket.emit("direction", direction);
	}
	rect(x, y, 50, 50);
	//console.log(speed);
	text(speed, 20,20);
	
	/*
		var color = map(diametre,0,1023,0,255);
		background(color);
		noStroke();
		fill(255-color);
	ellipse(width/2,height/2,diametre,diametre);	*/
}



