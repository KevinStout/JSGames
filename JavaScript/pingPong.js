var canvas;
var canvasContext;

var ballX = 50;
var ballY = 50;
var ballSpeedX = 10;
var ballSpeedY = 10;

var paddle1Y = 250;
var paddle2Y = 250;

var player1Score = 0;
var player2Score = 0;

var player1Name = 'Human';
var player2Name = 'Computer';

var showingWinScreen = false;

const PADDLE_HEIGHT = 100;
const PADDLE_THICKNESS = 15;
const PADDLE_DIST_FROM_EDGE = 40;

const SCORE_TO_WIN = 5;


window.onload = function(){
    canvas = document.getElementById('pingPongCanvas');
    canvasContext = canvas.getContext('2d');

    var framesPerSecond = 30;
    setInterval(updateAll, 1000/framesPerSecond);

    canvas.addEventListener('mousedown', handleMouseClick);

    canvas.addEventListener('mousemove', function(evt){
        var mousePos = updateMousePos(evt);
        paddle1Y = mousePos.y - (PADDLE_HEIGHT/2);
        
        //paddle2Y = mousePos.y - (PADDLE_HEIGHT/2); 
    });

}

function updateAll(){
    drawAll();
    moveAll();
}

function moveAll(){      
    ballMove();
    ballPaddle1YHandling(); // player paddle
    ballPaddle2YHandling(); // computer paddle
    computerMovingPaddle();
}

function ballMove(){
    ballX += ballSpeedX;
    ballY += ballSpeedY;

    if(player1Score == SCORE_TO_WIN){
        gameOver(player1Name);

    }else if(player2Score == SCORE_TO_WIN){
        gameOver(player2Name);
    }
        
    if(ballX > canvas.width && ballSpeedX > 0.0){ // right side of screen
            ballReset();
            ++player1Score;      
    }
    if(ballX < 0 && ballSpeedX < 0.0){ // left side of screen
            ballReset();
            ++player2Score;
    }
    if(ballY > canvas.height && ballSpeedY > 0.0){ // bottom of screen
        ballSpeedY *= -1;
    }
    if(ballY < 0 && ballSpeedY < 0.0){ // top of screen
        ballSpeedY *= -1;
    }
}

function gameOver(winner){
    showingWinScreen = true;
    drawNet('black');
    colorText("The " + winner + " Wins!!!", 250, canvas.height/2, 'green');
    colorText("click to continue", 280, canvas.height - 75, 'green');
    ballSpeedX =0;
    ballSpeedY = 0;
    ballY = 400;
    paddle2Y = ballY - (PADDLE_HEIGHT/2);
}

function handleMouseClick(evt){
    if(showingWinScreen == true){
        player1Score = 0;
        player2Score = 0;
        ballReset();
        showingWinScreen == false;
    }
}

function computerMovingPaddle(){
    var paddle2YCenter = paddle2Y + (PADDLE_HEIGHT/2);
    if (paddle2YCenter < ballY - 35){
        paddle2Y += 6;
    }else if(paddle2YCenter > ballY + 35){
        paddle2Y -= 6;
    }
}

function ballPaddle1YHandling(){ // player 1 paddle

    var paddleTopEdgeY = paddle1Y;
    var paddleBottomEdgeY = paddleTopEdgeY + PADDLE_HEIGHT;
    var paddleLeftEdgeX = PADDLE_DIST_FROM_EDGE;
    var paddleRightEdgeX = PADDLE_DIST_FROM_EDGE + PADDLE_THICKNESS;

    if(ballY > paddleTopEdgeY && // ball below the top of the paddle
        ballY < paddleBottomEdgeY && // ball above bottom of the paddle
        ballX > paddleLeftEdgeX && // ball right of the left side of the paddle 
        ballX < paddleRightEdgeX){ // ball left of the right side of the paddle

            ballSpeedX *= -1
            
            var centerOfPaddle1Y = paddle1Y + PADDLE_HEIGHT/2;
            var ballDistFromPaddleCenterY = ballY - centerOfPaddle1Y;

            ballSpeedY = ballDistFromPaddleCenterY * 0.35; // increase this number for more ball speed off the paddle

    } // ball center inside paddle
} // end of ballPaddleHandling

function ballPaddle2YHandling(){ // computer paddle

    var paddleTopEdgeY = paddle2Y;
    var paddleBottomEdgeY = paddleTopEdgeY + PADDLE_HEIGHT;
    var paddleLeftEdgeX = canvas.width - PADDLE_DIST_FROM_EDGE - PADDLE_THICKNESS;
    var paddleRightEdgeX = canvas.width - PADDLE_DIST_FROM_EDGE;

    if(ballY > paddleTopEdgeY && // ball below the top of the paddle
        ballY < paddleBottomEdgeY && // ball above bottom of the paddle
        ballX > paddleLeftEdgeX && // ball right of the left side of the paddle 
        ballX < paddleRightEdgeX){ // ball left of the right side of the paddle

            ballSpeedX *= -1
            
            var centerOfPaddle1Y = paddle2Y + PADDLE_HEIGHT/2;
            var ballDistFromPaddleCenterY = ballY - centerOfPaddle1Y;

            ballSpeedY = ballDistFromPaddleCenterY * 0.35; // increase this number for more ball speed off the paddle

    } // ball center inside paddle
} // end of ballPaddleHandling

function ballReset(){
    ballSpeedX = 10;
    ballSpeedY = 10;
    ballSpeedX = -ballSpeedX;
    ballX = canvas.width/2;
    ballY = canvas.height/2;
}

function updateMousePos(evt){
    var rect = canvas.getBoundingClientRect();
    var root = document.documentElement;

    mouseX = evt.clientX - rect.left - root.scrollLeft;
    mouseY = evt.clientY - rect.top - root.scrollTop;

    return{
        x:mouseX, y:mouseY
    };
}

function drawAll(){
    colorRect(0,0, canvas.width, canvas.height, 'black'); // drawing blank canvas
    drawNet('green');
    colorCircle(ballX, ballY, 10, 'green'); // drawing ball
    colorRect(PADDLE_DIST_FROM_EDGE, paddle1Y, PADDLE_THICKNESS, PADDLE_HEIGHT, 'green' ); // drawing left paddle
    colorRect(canvas.width - PADDLE_DIST_FROM_EDGE-PADDLE_THICKNESS, paddle2Y, PADDLE_THICKNESS, PADDLE_HEIGHT, 'green' ); // drawing right paddle
    colorText('Player: ' + player1Score, 100, 100, 'green');
    colorText('Computer: ' + player2Score, 500, 100, 'green');
}

function drawNet(color){
    for (var i=0; i<canvas.height; i+=40){
        colorRect(canvas.width/2, i, 5, 20, color);
    }    
}

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
    canvasContext.font = "30px Arial";
    canvasContext.fillText(showWords, textX, textY);
}
