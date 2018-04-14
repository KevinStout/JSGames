// keys to control the car
const KEY_LEFT_ARROW = 37;
const KEY_UP_ARROW = 38;
const KEY_RIGHT_ARROW = 39;
const KEY_DOWN_ARROW = 40;

const KEY_W = 87; // up
const KEY_A = 65; // left
const KEY_S = 83; // down
const KEY_D = 68; // right


var keyHeld_Gas = false;
var keyHeld_Reverse = false;
var keyHeld_TurnLeft = false;
var keyHeld_TurnRight = false;

mouseX = 0;
mouseY = 0;

function setupInput(){
    canvas.addEventListener('mousemove', updateMousePos);

    document.addEventListener('keydown', keyPressed);
    document.addEventListener('keyup', keyReleased);
}

function keyPressed(evt) {
    //console.log("key pressed: " + evt.keyCode);    
    if(evt.keyCode == KEY_LEFT_ARROW || evt.keyCode == KEY_A){ // turn car left
        keyHeld_TurnLeft = true;        
    }
    if(evt.keyCode == KEY_RIGHT_ARROW || evt.keyCode == KEY_D){ // turn car right 
        keyHeld_TurnRight = true;        
    }
    if(evt.keyCode == KEY_UP_ARROW || evt.keyCode == KEY_W){ // move car forward
        keyHeld_Gas = true;        
    }
    if(evt.keyCode == KEY_DOWN_ARROW || evt.keyCode == KEY_S){ // move car back
        keyHeld_Reverse = true;        
    }
    evt.preventDefault();
}

function keyReleased(evt) {
    //console.log("key released: " + evt.keyCode);    
    if(evt.keyCode == KEY_LEFT_ARROW || evt.keyCode == KEY_A){ // turn car left
        keyHeld_TurnLeft = false;        
    }
    if(evt.keyCode == KEY_RIGHT_ARROW || evt.keyCode == KEY_D){ // turn car right 
        keyHeld_TurnRight = false;        
    }
    if(evt.keyCode == KEY_UP_ARROW || evt.keyCode == KEY_W){ // move car forward
        keyHeld_Gas = false;        
    }
    if(evt.keyCode == KEY_DOWN_ARROW || evt.keyCode == KEY_S){ // move car back
        keyHeld_Reverse = false;        
    }
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