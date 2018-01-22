
var canvas;
var canvasContext;

var ballX = 75;
var ballY = 75;

var ballSpeedX = 5;
var ballSpeedY = 7;

var paddleX = 400;

const PADDLE_WIDTH = 100;
const PADDLE_THICKNESS = 10;
const PADDLE_DIST_FROM_EDGE =60;

const BRICK_W = 80;
const BRICK_H = 20;
const BRICK_COLS = 10;
const BRICK_ROWS = 14;
const BRICK_GAP = 2;

var brickGrid = new Array(BRICK_COLS * BRICK_ROWS);

mouseX = 0;
mouseY = 0;
    
function updateMousePos(evt){
    var rect = canvas.getBoundingClientRect();
    var root = document.documentElement;

    mouseX = evt.clientX - rect.left - root.scrollLeft;
    mouseY = evt.clientY - rect.top - root.scrollTop;

    paddleX = mouseX - PADDLE_WIDTH/2;
}

function brickReset(){
    for(var i=0; i<BRICK_COLS * BRICK_ROWS; i++){
        brickGrid[i] = true;
       
    } // end of for each brick loop

} // end of brickReset func

window.onload = function () {
    canvas = document.getElementById('gameCanvas');
    canvasContext = canvas.getContext('2d');

    var framesPerSecond = 30;
    setInterval(updateAll, 1000/framesPerSecond);

    canvas.addEventListener('mousemove', updateMousePos);

    brickReset();
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
    ballX += ballSpeedX;
    ballY += ballSpeedY;
        
    if(ballX > canvas.width){ // right side of screen
        ballSpeedX *= -1;
    }
    if(ballX < 0){ // left side of screen
        ballSpeedX *= -1;
    }

    if(ballY > canvas.height){ // bottom of screen
        ballReset();
    }
    if(ballY < 0){ // top of screen
        ballSpeedY *= -1;
    }

    var ballBrickCol = Math.floor(ballX / BRICK_W);
    var ballBrickRow = Math.floor(ballY / BRICK_H);
    var brickIndexUnderball = rowColToArrayIndex(ballBrickCol, ballBrickRow)
    
    if(ballBrickCol >= 0 && ballBrickCol < BRICK_COLS && ballBrickRow >= 0 && ballBrickRow < BRICK_ROWS){
        if(brickGrid[brickIndexUnderball] == true){
            brickGrid[brickIndexUnderball] = false;
            ballSpeedY *= -1;
        }
        
    }

    var paddleTopEdgeY = canvas.height-PADDLE_DIST_FROM_EDGE;
    var paddleBottomEdgeY = paddleTopEdgeY + PADDLE_THICKNESS;
    var paddleLeftEdgeX = paddleX;
    var paddleRightEdgeX = paddleX + PADDLE_WIDTH;

    if(ballY > paddleTopEdgeY && // ball below the top of the paddle
        ballY < paddleBottomEdgeY && // ball above bottom of the paddle
        ballX > paddleLeftEdgeX && // ball right of the left side of the paddle 
        ballX < paddleRightEdgeX){ // ball left of the right side of the paddle

            ballSpeedY *= -1;
            
            var centerOfPaddleX = paddleX + PADDLE_WIDTH/2;
            var ballDistFromPaddleCenterX = ballX - centerOfPaddleX;

            ballSpeedX = ballDistFromPaddleCenterX * 0.35; // increase this number for more ball speed off the paddle
        }
}

function drawAll(){
    
    colorRect(0,0, canvas.width, canvas.height, 'black');

    colorCircle(ballX, ballY, 10, 'red');

    colorRect(paddleX, canvas.height-PADDLE_DIST_FROM_EDGE, PADDLE_WIDTH, PADDLE_THICKNESS, 'white' );

    drawBricks();
}

function rowColToArrayIndex(col, row){
    return col + BRICK_COLS * row;
}

function drawBricks(){

    for (let eachRow = 0; eachRow < BRICK_ROWS; eachRow++) {
        for(var eachCol=0; eachCol<BRICK_COLS; eachCol++){

            var arryIndex = rowColToArrayIndex(eachCol, eachRow);

            if(brickGrid[arryIndex] == true){
                colorRect(BRICK_W*eachCol, BRICK_H*eachRow, BRICK_W-BRICK_GAP, BRICK_H-BRICK_GAP, 'blue');
            } // end of is brick here check
        } // end of for each brick i     
    } // end of for each row
} // end of drawBricks func

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
