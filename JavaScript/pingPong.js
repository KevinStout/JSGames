var canvas;
var canvasContext;

var ballX = 50;
var ballY = 50;
var ballSpeedX = 10;
var ballSpeedY = 10;

var paddle1Y = 250;

const PADDLE_HEIGHT = 100;
const PADDLE_THICKNESS = 10;
const PADDLE_DIST_FROM_EDGE = 60;


window.onload = function(){
    canvas = document.getElementById('pingPongCanvas');
    canvasContext = canvas.getContext('2d');

    var framesPerSecond = 30;
    setInterval(updateAll, 1000/framesPerSecond);

    canvas.addEventListener('mousemove', function(evt){
        var mousePos = updateMousePos(evt);
        paddle1Y = mousePos.y - (PADDLE_HEIGHT/2);
    });
}

function updateAll(){
    drawAll();
    moveAll();
}

function moveAll(){    
    
    ballX += ballSpeedX;    
	if(ballX < 0) {
		ballSpeedX = -ballSpeedX;
	}
	if(ballX > canvas.width) {
		ballSpeedX = -ballSpeedX;
	}

     ballY += ballSpeedY;
     if(ballY > canvas.height){
        ballSpeedY = -ballSpeedY;
    }
    if(ballY < 0){
        ballSpeedY = -ballSpeedY;
    }        
    
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
    colorCircle(ballX, ballY, 10, 'green'); // drawing ball
    colorRect(10, paddle1Y, PADDLE_THICKNESS, PADDLE_HEIGHT, 'blue' ); // drawing left paddle
    colorRect(canvas.width - 20, 210, PADDLE_THICKNESS, PADDLE_HEIGHT, 'green' ); // drawing right paddle
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
    canvasContext.fillText(showWords, textX, textY);
}