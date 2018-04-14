var canvas;
var canvasContext;

window.onload = function () {
    canvas = document.getElementById('gameCanvas');
    canvasContext = canvas.getContext('2d');
    loadingPage();
    loadImages();
}

function imageLoadingDoneStartGame(){
    var framesPerSecond = 30;
    setInterval(updateAll, 1000/framesPerSecond);

    setupInput();    
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
    drawTracks();
    carDraw();    
}

function rowColToArrayIndex(col, row){
    return col + TRACK_COLS * row;
}
