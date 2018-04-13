
var canvas;
var canvasContext;

var ballX = 75;
var ballY = 75;

var ballSpeedX = 5;
var ballSpeedY = 7;

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
                 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1,
                 1, 1, 1, 1, 0, 0, 1, 0, 0, 1, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1,
                 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1,
                 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1,
                 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,];


mouseX = 0;
mouseY = 0;

window.onload = function () {
    canvas = document.getElementById('gameCanvas');
    canvasContext = canvas.getContext('2d');

    var framesPerSecond = 30;
    setInterval(updateAll, 1000/framesPerSecond);

    canvas.addEventListener('mousemove', updateMousePos);
    ballReset();
}
    
function updateMousePos(evt){
    var rect = canvas.getBoundingClientRect();
    var root = document.documentElement;

    mouseX = evt.clientX - rect.left - root.scrollLeft;
    mouseY = evt.clientY - rect.top - root.scrollTop;

    //hack to test ball in any position
    /*
    ballX = mouseX;
    ballY = mouseY;
    ballSpeedX = 4;
    ballSpeedY = -4;
    */
}


function updateAll() {
    moveAll();
    drawAll();
}

function ballReset(){
    ballX = canvas.width/2;
    ballY = canvas.height/2;
}

function moveAll(){
    ballMove();
    ballTrackHandling();
}

function ballMove(){
    ballX += ballSpeedX;
    ballY += ballSpeedY;
        
    if(ballX > canvas.width && ballSpeedX > 0.0){ // right side of screen
        ballSpeedX *= -1;
    }
    if(ballX < 0 && ballSpeedX < 0.0){ // left side of screen
        ballSpeedX *= -1;
    }

    if(ballY > canvas.height){ // bottom of screen
        ballReset();

    }
    if(ballY < 0 && ballSpeedY < 0.0){ // top of screen
        ballSpeedY *= -1;
    }
}

function isTrackAtColRow(col, row) {
    if(col >= 0 && col < TRACK_COLS && row >= 0 && row < TRACK_ROWS){
        var trackIndexUnderCoord = rowColToArrayIndex(col, row);
        return trackGrid[trackIndexUnderCoord]
    } else{
        return false;
    }
}

function ballTrackHandling(){
    var ballTrackCol = Math.floor(ballX / TRACK_W);
    var ballTrackRow = Math.floor(ballY / TRACK_H);
    var trackIndexUnderball = rowColToArrayIndex(ballTrackCol, ballTrackRow);
    
    if(ballTrackCol >= 0 && ballTrackCol < TRACK_COLS && ballTrackRow >= 0 && ballTrackRow < TRACK_ROWS){
        if(isTrackAtColRow(ballTrackCol, ballTrackRow)){
            

            var prevBallX = ballX - ballSpeedX;
            var prevBallY = ballY - ballSpeedY;
            var prevTrackCol = Math.floor(prevBallX / TRACK_W);
            var prevTrackRow = Math.floor(prevBallY / TRACK_H);

            var bothTestsFailed = true;

            if(prevTrackCol != ballTrackCol){                
                if(isTrackAtColRow(prevTrackCol, ballTrackRow) == false){ //checking if there is a track on the side of the track that was hit
                    ballSpeedX *= -1;
                    bothTestsFailed = false;
                }                
            }
            if(prevTrackRow != ballTrackRow){
                
                if(isTrackAtColRow(prevTrackRow, ballTrackCol) == false){ //checking if there is a track on the top or bottom of the track that was hit
                    ballSpeedY *= -1;
                    bothTestsFailed = false;
                }                
            }
            
            if(bothTestsFailed){ // prevents ball from going right through the edge of a track when other tracks are around it
                ballSpeedX *= -1;
                ballSpeedY *= -1;
            }

        } // end of if birck is there remove it and change ball direction        
    } // end of checking for valid col and row
} // end of ballTrackHandling func


function drawAll(){
    
    colorRect(0,0, canvas.width, canvas.height, 'black');

    colorCircle(ballX, ballY, 10, 'red');

    drawTracks();
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
