
var carPic = document.createElement("img");
var carPicLoaded = false;

var canvas;
var canvasContext;

var carX = 75;
var carY = 75;

var carAngle = 0;
var carSpeed = 0;

const TRACK_W = 40;
const TRACK_H = 40;
const TRACK_COLS = 20;
const TRACK_ROWS = 15;
const TRACK_GAP = 2;

var trackGrid = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 
                 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1,
                 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1,
                 1, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 1,
                 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 0, 1, 1, 0, 1, 1, 0, 0, 1,
                 1, 0, 0, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 1, 0, 0, 1,
                 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1,
                 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1,
                 1, 0, 0, 1, 0, 0, 1, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1,
                 1, 0, 0, 1, 0, 0, 1, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1,
                 1, 0, 2, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1,
                 1, 1, 1, 1, 0, 0, 1, 0, 0, 1, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1,
                 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1,
                 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1,
                 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,];

const KEY_LEFT_ARROW = 37;
const KEY_UP_ARROW = 38;
const KEY_RIGHT_ARROW = 39;
const KEY_DOWN_ARROW = 40;

const KEY_A = 65; // left
const KEY_W = 87; // up
const KEY_D = 68; // right
const KEY_S = 83; // down

var keyHeld_Gas = false;
var keyHeld_Reverse = false;
var keyHeld_TurnLeft = false;
var keyHeld_TurnRight = false;

mouseX = 0;
mouseY = 0;

window.onload = function () {
    canvas = document.getElementById('gameCanvas');
    canvasContext = canvas.getContext('2d');

    var framesPerSecond = 30;
    setInterval(updateAll, 1000/framesPerSecond);

    canvas.addEventListener('mousemove', updateMousePos);

    document.addEventListener('keydown', keyPressed);
    document.addEventListener('keyup', keyReleased);

    carPic.onload = function(){
        carPicLoaded = true;
    }
    carPic.src = "../media/player1car.png";

    carReset();
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


function updateAll() {
    moveAll();
    drawAll();
}

function carReset(){
    for (let eachRow = 0; eachRow < TRACK_ROWS; eachRow++) {
        for(var eachCol=0; eachCol<TRACK_COLS; eachCol++){

            var arryIndex = rowColToArrayIndex(eachCol, eachRow);

            if(trackGrid[arryIndex] == 2){ //setting car position based on grid
                trackGrid[arryIndex] = 0;
                carX = eachCol * TRACK_W + TRACK_W/2;
                carY = eachRow * TRACK_H + TRACK_H/2;
            }
        }
    }
}// end of carReset

function moveAll(){
    carMove();
    carTrackHandling();
}

function carMove(){
    if (keyHeld_Gas) {
        carSpeed += 0.02;
    }
    if (keyHeld_Reverse) {
        carSpeed -= 0.04;
    }
    if (keyHeld_TurnLeft) {
        carAngle -= 0.06;
    }
    if (keyHeld_TurnRight) {
        carAngle += 0.06;
    }

    carX += Math.cos(carAngle) * carSpeed;
    carY += Math.sin(carAngle) * carSpeed;
}

function isTrackAtColRow(col, row) {
    if(col >= 0 && col < TRACK_COLS && row >= 0 && row < TRACK_ROWS){
        var trackIndexUnderCoord = rowColToArrayIndex(col, row);
        return trackGrid[trackIndexUnderCoord]
    } else{
        return false;
    }
}

function carTrackHandling(){
    var carTrackCol = Math.floor(carX / TRACK_W);
    var carTrackRow = Math.floor(carY / TRACK_H);
    var trackIndexUndercar = rowColToArrayIndex(carTrackCol, carTrackRow);
    
    if(carTrackCol >= 0 && carTrackCol < TRACK_COLS && carTrackRow >= 0 && carTrackRow < TRACK_ROWS){
        if(isTrackAtColRow(carTrackCol, carTrackRow)){
            
            carSpeed *= -1; //rev car speed
            //carSpeed = 0; //stop the car when hitting a wall

        } // end of if, track hit stop car        
    } // end of checking for valid col and row
} // end of carTrackHandling func


function drawAll(){
    
    colorRect(0,0, canvas.width, canvas.height, 'black'); //clear screen

    //colorCircle(carX, carY, 10, 'red');
    if(carPicLoaded){
        drawBitmapCenteredWithRotation(carPic, carX, carY, carAngle);
    }

    drawTracks();
}

function drawBitmapCenteredWithRotation(useBitmap, atX, atY, withAng) { // drawing the car image and rotation
    canvasContext.save();
    canvasContext.translate(atX, atY);
    canvasContext.rotate(withAng);
    canvasContext.drawImage(useBitmap, -useBitmap.width/2, -useBitmap.height/2);
    canvasContext.restore();
}

function rowColToArrayIndex(col, row){
    return col + TRACK_COLS * row;
}

function drawTracks(){

    for (let eachRow = 0; eachRow < TRACK_ROWS; eachRow++) {
        for(var eachCol=0; eachCol<TRACK_COLS; eachCol++){

            var arryIndex = rowColToArrayIndex(eachCol, eachRow);

            if(trackGrid[arryIndex] == 1){
                colorRect(TRACK_W*eachCol, TRACK_H*eachRow, TRACK_W-TRACK_GAP, TRACK_H-TRACK_GAP, 'green');
            } // end of is track here check
        } // end of for each track i     
    } // end of for each row
} // end of drawTracks func

function colorRect(topLeftX, topLeftY, boxWidth, boxHeight, fillColor){
    canvasContext.fillStyle = fillColor;
    canvasContext.fillRect(topLeftX,topLeftY, boxWidth, boxHeight);
}

function colorCircle(centerX, centerY, radius, fillColor){
    canvasContext.fillStyle = fillColor;
    canvasContext.beginPath();
    canvasContext. arc(centerX, centerY, radius, 0, Math.PI*2, true);
    canvasContext.fill();
}

function colorText(showWords, textX, textY, fillColor){
    canvasContext.fillStyle = fillColor;
    canvasContext.fillText(showWords, textX, textY);
}
