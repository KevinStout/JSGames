
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
var bricksLeft = 0;

mouseX = 0;
mouseY = 0;

window.onload = function () {
    canvas = document.getElementById('gameCanvas');
    canvasContext = canvas.getContext('2d');

    var framesPerSecond = 30;
    setInterval(updateAll, 1000/framesPerSecond);

    canvas.addEventListener('mousemove', updateMousePos);

    brickReset();
    ballReset();
}
    
function updateMousePos(evt){
    var rect = canvas.getBoundingClientRect();
    var root = document.documentElement;

    mouseX = evt.clientX - rect.left - root.scrollLeft;
    mouseY = evt.clientY - rect.top - root.scrollTop;

    paddleX = mouseX - PADDLE_WIDTH/2;

    //hack to test ball in any position
    /*
    ballX = mouseX;
    ballY = mouseY;
    ballSpeedX = 4;
    ballSpeedY = -4;
    */
}

function brickReset(){
    bricksLeft = 0;
    for(var i=0; i< 3 * BRICK_COLS; i++){ // adds an empty space at the top of the screen
        brickGrid[i] = false
    }
    for(var i=3 * BRICK_COLS; i<BRICK_COLS * BRICK_ROWS; i++){ // adds the rest of the bricks to the array
        brickGrid[i] = true;
       bricksLeft++;
    } // end of for each brick loop

} // end of brickReset func

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
    ballBrickHandling();
    ballPaddleHandling();
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
        brickReset();
    }
    if(ballY < 0 && ballSpeedY < 0.0){ // top of screen
        ballSpeedY *= -1;
    }
}

function isBrickAtColRow(col, row) {
    if(col >= 0 && col < BRICK_COLS && row >= 0 && row < BRICK_ROWS){
        var brickIndexUnderCoord = rowColToArrayIndex(col, row);
        return brickGrid[brickIndexUnderCoord]
    } else{
        return false;
    }
}

function ballBrickHandling(){
    var ballBrickCol = Math.floor(ballX / BRICK_W);
    var ballBrickRow = Math.floor(ballY / BRICK_H);
    var brickIndexUnderball = rowColToArrayIndex(ballBrickCol, ballBrickRow);
    
    if(ballBrickCol >= 0 && ballBrickCol < BRICK_COLS && ballBrickRow >= 0 && ballBrickRow < BRICK_ROWS){
        if(isBrickAtColRow(ballBrickCol, ballBrickRow)){
            brickGrid[brickIndexUnderball] = false;
            bricksLeft--;
            console.log(bricksLeft);
            

            var prevBallX = ballX - ballSpeedX;
            var prevBallY = ballY - ballSpeedY;
            var prevBrickCol = Math.floor(prevBallX / BRICK_W);
            var prevBrickRow = Math.floor(prevBallY / BRICK_H);

            var bothTestsFailed = true;

            if(prevBrickCol != ballBrickCol){                
                if(isBrickAtColRow(prevBrickCol, ballBrickRow) == false){ //checking if there is a brick on the side of the brick that was hit
                    ballSpeedX *= -1;
                    bothTestsFailed = false;
                }                
            }
            if(prevBrickRow != ballBrickRow){
                
                if(isBrickAtColRow(prevBrickRow, ballBrickCol) == false){ //checking if there is a brick on the top or bottom of the brick that was hit
                    ballSpeedY *= -1;
                    bothTestsFailed = false;
                }                
            }
            
            if(bothTestsFailed){ // prevents ball from going right through the edge of a brick when other bricks are around it
                ballSpeedX *= -1;
                ballSpeedY *= -1;
            }

        } // end of if birck is there remove it and change ball direction        
    } // end of checking for valid col and row
} // end of ballBrickHandling func

function ballPaddleHandling(){
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

            if(bricksLeft == 0){
                brickReset();
            } // out of bricks, add new grid of bricks
    } // ball center inside paddle
} // end of ballPaddleHandling

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
