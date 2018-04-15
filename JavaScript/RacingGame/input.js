// keys to control the car
const KEY_LEFT_ARROW = 37;
const KEY_UP_ARROW = 38;
const KEY_RIGHT_ARROW = 39;
const KEY_DOWN_ARROW = 40;

const KEY_W = 87; // up
const KEY_A = 65; // left
const KEY_S = 83; // down
const KEY_D = 68; // right

mouseX = 0;
mouseY = 0;

function setupInput(){
    canvas.addEventListener('mousemove', updateMousePos);

    document.addEventListener('keydown', keyPressed);
    document.addEventListener('keyup', keyReleased);

    greenCar.setupInput(KEY_UP_ARROW, KEY_RIGHT_ARROW, KEY_DOWN_ARROW, KEY_LEFT_ARROW);
    blueCar.setupInput(KEY_W, KEY_D, KEY_S, KEY_A);
}

function keySet(keyEvent, whichCar, setTo) {
    if(keyEvent.keyCode == whichCar.controlKeyLeft){ // turn car left
        whichCar.keyHeld_TurnLeft = setTo;        
    }
    if(keyEvent.keyCode == whichCar.controlKeyRight){ // turn car right 
        whichCar.keyHeld_TurnRight = setTo;        
    }
    if(keyEvent.keyCode == whichCar.controlKeyUp){ // move car forward
        whichCar.keyHeld_Gas = setTo;        
    }
    if(keyEvent.keyCode == whichCar.controlKeyDown){ // move car back
        whichCar.keyHeld_Reverse = setTo;        
    }
    event.preventDefault();
}

function keyPressed(evt) {
    //console.log("key pressed: " + evt.keyCode);    
    keySet(evt, blueCar, true);
    keySet(evt, greenCar, true);
}

function keyReleased(evt) {       
    keySet(evt, blueCar, false);
    keySet(evt, greenCar, false);
}
    
function updateMousePos(evt){
    var rect = canvas.getBoundingClientRect();
    var root = document.documentElement;

    mouseX = evt.clientX - rect.left - root.scrollLeft;
    mouseY = evt.clientY - rect.top - root.scrollTop;

    //hack to test car in any position
    /*
    carX = mouseX;
    carY = mouseY;
    carSpeedX = 4;
    carSpeedY = -4;
    */
}