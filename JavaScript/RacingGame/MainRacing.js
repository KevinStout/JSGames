var canvas;
var canvasContext;

window.onload = function () {
    canvas = document.getElementById('gameCanvas');
    canvasContext = canvas.getContext('2d');

    var framesPerSecond = 30;
    setInterval(updateAll, 1000/framesPerSecond);

    setupInput();

    carPic.onload = function(){
        carPicLoaded = true;
    }
    carPic.src = "../media/player1car.png";

    carReset();
}

function updateAll() {
    moveAll();
    drawAll();
}

function moveAll(){
    carMove();
    carTrackHandling();
}

function drawAll(){    
    clearScreen();
    carDraw();
    drawTracks();
}

function clearScreen(){
    colorRect(0,0, canvas.width, canvas.height, 'black');
}

function rowColToArrayIndex(col, row){
    return col + TRACK_COLS * row;
}
