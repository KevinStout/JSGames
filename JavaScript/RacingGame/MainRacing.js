var canvas;
var canvasContext;

var blueCar = new carClass();
var greenCar = new carClass();

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
    loadLevel(levelOne);
}

function loadLevel(whichLevel){
    trackGrid = whichLevel.slice(); // this is copying the track level array so it can be changed as they game is played, but not change the initial state of the map
    blueCar.reset(blueCarPic, "Blue Car");
    greenCar.reset(greenCarPic, "Green Car");
}

function updateAll() {
    moveAll();
    drawAll();
}

function moveAll(){
    blueCar.move();    
    greenCar.move();
}

function drawAll(){ 
    drawTracks();
    blueCar.draw();
    greenCar.draw();   
}

function rowColToArrayIndex(col, row){
    return col + TRACK_COLS * row;
}
