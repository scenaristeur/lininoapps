examples
======================
### blink.js
in this example the board led on digital pin 13 will blink every 1 second

### blink-web.js
in this example the board led on digital pin 13 and a lightbulb image on web page will blink every 1 second



### button-web.js
this example create a simple http server that responds with a page (html/page-server-side-read.html); this page contains button which update its param value in the onclick function. The example below will read the param value of the button and send the LOW or HIGH value to the digital LED 13

### button.js
in this example there is a button connected at digital pin 8.
> when the button is pressed the led on board (digital pin 13) will turn on, 
> when the button is released the led will turn off.

### fade-led.js
in this example the board led on digital pin 13 and a lightbulb image on web page will blink every 1 second

### lightbulb.js
this example create a simple http server that responds with a page (html/page-server-side-write.html); this page contains an <img> tag to show a light bulb image. Also there's a button connected at digital pin 8. When the button will pressed or realesed tha image of the light bulb on the page will change

### program-web.js
this example create a simple http server that responds with a page (html/page-client-side.html). This page contains some buttons that allows the user to send the common commands directly to the board, ie: pinMode, digitalRead, digitalWrite, etc..

### servo-twins.js
this example create a simple http server that responds with a page (html/servo-twins.html). This page contains some sliders that allows the user to move the servo in horizontal and vertical

### supermario.js
play super mario theme song with a piezo buzzer

***NB*** Some examples use node-static module
